"use client";

import SortProducts from "@/components/SortProducts/SortProducts";
import AddStockForm from "@/components/StockForm/AddStockForm";
import UpdateStockForm from "@/components/StockForm/UpdateStockForm";
import Stocktable from "@/components/Stocktable/Stocktable";
import TitleBar from "@/components/TitleBar/TitleBar";
import Layout from "@/layout";
import ProductsService from "@/services/products/Products";
import StockServices from "@/services/stock/stock";
import Loader from "@/utils/Loader";
import { Pagination } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export interface StockValues {
  productDescriptionCode: string;
  quantity: number;
  productDescription: string;
  productCode: string;
  productType: string;
  productCategoryCode: string;
  stockCode: string;
}

export default function DashboardStock() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [productCode, setProductCode] = useState("");
  const [sortValue, setSortValue] = useState("all");
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({} as StockValues);
  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();

  const { addStock, getAllStock, updateStock } = StockServices();
  const { getAllProducts, getAllProductDescriptions } = ProductsService();

  const { data, isLoading } = useQuery({
    queryFn: () => getAllStock(currentPage - 1),
    queryKey: ["getAllStock", { currentPage }],
  });

  const { data: products } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["getAllProducts"],
  });
  const productCodes = products?.productDtoList.map((product) => product.code);
  const prCode = () => {
    if (productCode.length > 0) return productCode;
    if (productCodes) return productCodes[0];
    return "";
  };

  const { data: productsDescriptions } = useQuery({
    queryFn: () => getAllProductDescriptions(pageNo - 1, prCode()),
    queryKey: ["getAllProducts", { pageNo }, { productCode }],
  });

  const { mutateAsync: addStockAsync } = useMutation({
    mutationFn: addStock,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllStock", { currentPage }],
      });
    },
  });

  const { mutateAsync: updateStockAsync } = useMutation({
    mutationFn: updateStock,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllStock", { currentPage }],
      });
    },
  });

  const uniqueProductCodes = Array.from(
    new Set(data?.map((stock) => stock.productCode))
  );
  const showUpdateForm = (id: number) => {
    const stock = data?.find((stock) => stock.id === id);
    if (!stock) return;
    // if (!stock.productCode) return;
    const {
      productCategoryCode,
      productCode,
      productDescription,
      productDescriptionCode,
      productType,
      quantity,
      stockCode,
    } = stock;
    setFormValues({
      productCategoryCode,
      productCode,
      productDescription,
      productDescriptionCode,
      productType,
      quantity,
      stockCode,
    });
    setShowForm(true);
  };

  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <Loader />;
  }

  return (
    <Layout active="stock">
      <TitleBar />

      <SortProducts
        setSortValue={setSortValue}
        showProductForm={() => setShow(true)}
        sortArray={uniqueProductCodes}
        sortValue={sortValue}
        type="stock"
        useAll
        shouldAdd
      />

      <div className="products_wrapper flex flex-col">
        <div className="basis-11/12 overflow-y-scroll prodTable">
          {data && data.length > 0 ? (
            <Stocktable stocks={data} showUpdateForm={showUpdateForm} />
          ) : (
            <p className="text-center text-sm text-slate-600">stock is empty</p>
          )}
        </div>
        <div className="basis-1/12 flex items-center justify-center gap-2">
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={101}
            color="indigo"
            siblings={3}
            defaultValue={1}
            withEdges
          />
        </div>
      </div>

      <AddStockForm
        products={products}
        setShow={setShow}
        show={show}
        addStockAsync={addStockAsync}
      />
      <UpdateStockForm
        formValues={formValues}
        mutateAsync={updateStockAsync}
        setShow={setShowForm}
        show={showForm}
        products={products}
      />
    </Layout>
  );
}
