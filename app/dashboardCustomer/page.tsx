"use client";

import CustomersTable from "@/components/CustomersTable/CustomersTable";
import SortProducts from "@/components/SortProducts/SortProducts";
import TitleBar from "@/components/TitleBar/TitleBar";
import Layout from "@/layout";
import CustomersService from "@/services/customers/customers";
import Loader from "@/utils/Loader";
import { Pagination } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function DashboardCustomer() {
  const [sortValue, setSortValue] = useState("all");
  const [pageNo, setPageNo] = useState(1);
  const { getAllCustomers, deleteUser } = CustomersService();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["allCustomers", { pageNo }],
    queryFn: () => getAllCustomers(pageNo - 1),
  });

  const { mutateAsync: deleteUserAsync } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allCustomers"],
      });
    },
  });

  const customers = data?.userDtoList.map((user) => user.userType);

  const sortedCustomers = () => {
    if (sortValue.toLowerCase() === "all") return data?.userDtoList;
    return data?.userDtoList.filter(
      (product) => product.userType.toLowerCase() === sortValue.toLowerCase()
    );
  };

  if (isLoading) {
    return <Loader />;
  }
  if (!customers) {
    return <Loader />;
  }

  return (
    <Layout active="customers">
      <TitleBar />

      <SortProducts
        setSortValue={setSortValue}
        shouldAdd={false}
        showProductForm={() => console.log("")}
        sortArray={customers}
        sortValue={sortValue}
        type="customer"
        useAll
      />

      <div className="products_wrapper flex flex-col">
        <div className="basis-11/12 overflow-y-scroll prodTable">
          {data && data?.userDtoList?.length > 0 ? (
            <CustomersTable
              customers={sortedCustomers()}
              mutateAsync={deleteUserAsync}
            />
          ) : (
            <p className="text-center text-sm text-slate-600">
              Customer list is empty
            </p>
          )}
        </div>
        <div className="basis-1/12 flex items-center justify-center gap-2">
          <Pagination
            value={pageNo}
            onChange={setPageNo}
            total={101}
            color="indigo"
            siblings={1}
            defaultValue={1}
            withEdges
          />
        </div>
      </div>
    </Layout>
  );
}
