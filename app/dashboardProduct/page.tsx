"use client";

import AddProductForm from "@/components/ProductForm/AddProductForm";
import UpdateProductForm from "@/components/ProductForm/UpdateProductForm";
import ProductTable from "@/components/ProductsTable/ProductsTable";
import SortProducts from "@/components/SortProducts/SortProducts";
import TitleBar from "@/components/TitleBar/TitleBar";
import { Context } from "@/contexts";
import Layout from "@/layout";
import ProductsService from "@/services/products/Products";
import Loader from "@/utils/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";

export default function DashboardProduct() {
  const [sortValue, setSortValue] = useState("all");
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [productFormValues, setProductFormValues] = useState(
    {} as {
      code: string;
      type: string;
    }
  );

  const { getAllProducts, addProduct, updateProduct } = ProductsService();
  const { setErrorMessage, showModal } = useContext(Context);
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["allProducts"],
  });

  const { mutateAsync: addProductAsync } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allProducts"],
      });
    },
  });

  const { mutateAsync: updateProductAsync } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allProducts"],
      });
    },
  });

  const showUpdateForm = (id: number) => {
    const product = data?.productDtoList?.find((product) => product.id === id);
    if (!product) return;
    setProductFormValues({
      code: product?.code,
      type: product?.type,
    });
    setShowForm(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error?.message) {
    setErrorMessage(error.message);
    showModal();
  }

  const uniqueTypes = Array.from(
    new Set(data?.productDtoList.map((product) => product.type))
  );

  const sortedProducts = () => {
    if (sortValue.toLowerCase() === "all") return data?.productDtoList;
    return data?.productDtoList.filter(
      (product) => product.type.toLowerCase() === sortValue.toLowerCase()
    );
  };

  return (
    <Layout active="product">
      <TitleBar />

      <SortProducts
        setSortValue={setSortValue}
        showProductForm={() => setShow(true)}
        sortArray={uniqueTypes}
        sortValue={sortValue}
        type="product"
        useAll
        shouldAdd
      />

      <div className="products_wrapper">
        {data && data?.productDtoList?.length > 0 ? (
          <ProductTable
            products={sortedProducts()}
            showUpdateForm={showUpdateForm}
          />
        ) : (
          <p className="text-center text-sm text-slate-600">product is empty</p>
        )}
      </div>

      <AddProductForm
        show={show}
        setShow={setShow}
        mutateAsync={addProductAsync}
      />

      <UpdateProductForm
        onClose={() => setShowForm(false)}
        open={showForm}
        productFormValues={productFormValues}
        updateProductAsync={updateProductAsync}
      />
    </Layout>
  );
}
