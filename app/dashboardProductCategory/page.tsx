"use client";

import SortProducts from "@/components/SortProducts/SortProducts";
import TitleBar from "@/components/TitleBar/TitleBar";
import Layout from "@/layout";
import ProductsService from "@/services/products/Products";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Pagination } from "@mantine/core";
import ProductCategoryTable from "@/components/ProductCategoryTable/ProductCategoryTable";
import AddProductCategory from "@/components/ProductCategoryForm/AddProductCategory";
import UpdateProductCategory from "@/components/ProductCategoryForm/UpdateProductCategory";
import Loader from "@/utils/Loader";

const productCategoryValues = {
  category: "",
  code: "",
  productCode: "",
};

export default function ProductCategory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState("all");
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState(productCategoryValues);

  const queryClient = useQueryClient();

  const {
    getAllProductCategories,
    getAllProducts,
    addProductCategory,
    updateProductCategory,
  } = ProductsService();

  const { data, isLoading } = useQuery({
    queryFn: () => getAllProductCategories(currentPage - 1),
    queryKey: ["getAllProductCategories", { currentPage }],
  });
  const { data: products } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["getAllProducts"],
  });

  const { mutateAsync: addProductCategoryAsync } = useMutation({
    mutationFn: addProductCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllProductCategories", { currentPage }],
      });
    },
  });
  
  const { mutateAsync: updateProductCategoryAsync } = useMutation({
    mutationFn: updateProductCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllProductCategories", { currentPage }],
      });
    },
  });

  const productCategories = data?.productCategoryDtoList;

  const displayProductCategoriesBySort = () => {
    if (!productCategories) return [];

    if (sortValue.toLowerCase() === "all") return productCategories;
    else
      return productCategories.filter(
        (product) => product.category.toLowerCase() === sortValue.toLowerCase()
      );
  };
  const uniqueCategories = Array.from(
    new Set(productCategories?.map((cat) => cat.category))
  );
  const showUpdateForm = (id: number) => {
    const product = productCategories?.find((product) => product.id === id);
    if (!product) return;
    if (!product.productCode) return;
    setFormValues({
      code: product?.code,
      category: product?.category,
      productCode: product.productCode,
    });
    setShowForm(true);
  };
  if (isLoading) {
    return <Loader />;
  }
  if (!products) {
    return <Loader />;
  }

  return (
    <Layout active="product">
      <TitleBar />
      <SortProducts
        setSortValue={setSortValue}
        showProductForm={() => setShow(true)}
        sortArray={uniqueCategories}
        sortValue={sortValue}
        type="product category"
        useAll
        shouldAdd
      />
      <div className="products_wrapper flex flex-col">
        <div className="basis-11/12 overflow-y-scroll prodTable">
          {productCategories && productCategories.length > 0 ? (
            <ProductCategoryTable
              productCategories={displayProductCategoriesBySort()}
              showUpdateForm={showUpdateForm}
            />
          ) : (
            <p className="text-center text-sm text-slate-600">
              product category is empty
            </p>
          )}
        </div>
        <div className="basis-1/12 flex items-center justify-center gap-2">
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={11}
            color="indigo"
            siblings={1}
            defaultValue={1}
            withEdges
          />
        </div>
      </div>
      <AddProductCategory
        mutateAsync={addProductCategoryAsync}
        productDtoList={products.productDtoList}
        setShow={setShow}
        show={show}
      />
      <UpdateProductCategory
        formValues={formValues}
        mutateAsync={updateProductCategoryAsync}
        productDtoList={products.productDtoList}
        setShow={setShowForm}
        show={showForm}
      />
    </Layout>
  );
}
