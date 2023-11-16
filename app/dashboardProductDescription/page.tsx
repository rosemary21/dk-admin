"use client";

import SortProducts from "@/components/SortProducts/SortProducts";
import TitleBar from "@/components/TitleBar/TitleBar";
import Layout from "@/layout";
import ProductsService from "@/services/products/Products";
import Loader from "@/utils/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "@mantine/core";
import ProductDescriptionTable from "@/components/ProductDescriptionTable/ProductDescriptionTable";
import { ProductDescriptionProps } from "@/types";
import AddProductDescription from "@/components/ProductDescriptionForms/AddProductDescription";
import UpdateProductDescription from "@/components/ProductDescriptionForms/UpdateProductDescription";

export type ProductDescriptionValues = Pick<
  ProductDescriptionProps,
  | "amount"
  | "code"
  | "currency"
  | "description"
  | "location"
  | "percentageDiscount"
  | "productCode"
  | "productCategoryCode"
  | "productSize"
  | "imageUrl"
  | "imagesList"
  | "landDoc"
>;

export default function DashboardProductDescription() {
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({} as ProductDescriptionValues);
  const [productCode, setProductCode] = useState("");
  const {
    getAllProductDescriptions,
    getAllProducts,
    getAllProductCategoriesPages,
    addProductDescription,
    updateProductDescription,
  } = ProductsService();

  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryFn: () => getAllProducts(),
    queryKey: ["getAllProducts"],
  });
  const productCodes = products?.productDtoList.map((product) => product.code);
  const prCode = () => {
    if (productCode.length > 0) return productCode;
    if (productCodes) return productCodes[0];
    return "";
  };
  const { data: productCategories } = useQuery({
    queryFn: getAllProductCategoriesPages,
    queryKey: ["getAllProductCategories"],
    enabled: !!productCodes,
  });

  const productCategoryCodes = productCategories?.productCategoryDtoList
    ?.map((category) => category.id)
    .map((el) => String(el));

  const { data, isLoading } = useQuery({
    queryFn: () => getAllProductDescriptions(currentPage - 1, prCode()),
    queryKey: ["getAllProductDescriptions", { currentPage }, { productCode }],
    enabled: !!productCategoryCodes,
  });

  const { mutateAsync: addDescriptionAsync } = useMutation({
    mutationFn: addProductDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "getAllProductDescriptions",
          { currentPage },
          { productCode },
        ],
      });
    },
  });

  const { mutateAsync: updateDescriptionAsync } = useMutation({
    mutationFn: updateProductDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "getAllProductDescriptions",
          { currentPage },
          { productCode },
        ],
      });
    },
  });

  const productDescriptions = data?.productDescriptionDtoList;

  if (!productCodes) {
    return <Loader />;
  }
  if (isLoading) {
    return <Loader />;
  }
  const showUpdateForm = async (id: number) => {
    const product = productDescriptions?.find((product) => product.id === id);
    // const product = await getAProductDescription(String(id));
    if (!product) return;
    const {
      amount,
      code,
      currency,
      description,
      location,
      percentageDiscount,
      productCategoryCode,
      productCode,
      productSize,
      imageUrl,
      imagesList,
      landDoc,
    } = product;
    setFormValues({
      amount,
      code,
      currency,
      description,
      location,
      productCategoryCode,
      productSize,
      productCode,
      percentageDiscount,
      imageUrl,
      imagesList,
      landDoc,
    });
    setShowForm(true);
  };
  return (
    <Layout active="product">
      <TitleBar />

      <SortProducts
        setSortValue={setProductCode}
        showProductForm={() => setShow(true)}
        sortArray={productCodes}
        sortValue={productCode}
        type="product description"
        useAll={false}
        shouldAdd
      />

      <div className="products_wrapper flex flex-col">
        <div className="basis-11/12 overflow-y-scroll prodTable">
          {productDescriptions && productDescriptions.length > 0 ? (
            <ProductDescriptionTable
              productDescription={productDescriptions}
              showUpdateForm={showUpdateForm}
            />
          ) : (
            <p className="text-center text-sm text-slate-600">
              product description is empty
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

      <AddProductDescription
        productCategoryCodes={productCategoryCodes}
        setShow={setShow}
        show={show}
        productCodes={productCodes}
        mutateAsync={addDescriptionAsync}
      />

      <UpdateProductDescription
        mutateAsync={updateDescriptionAsync}
        productCategoryCodes={productCategoryCodes}
        setShow={setShowForm}
        show={showForm}
        productCodes={productCodes}
        formValues={formValues}
      />
    </Layout>
  );
}
