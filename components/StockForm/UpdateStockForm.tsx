import { GetAllProductDescriptionProps, GetAllProductsProps } from "@/types";
import { Drawer } from "antd";
import { useFormik } from "formik";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { BsUpload } from "react-icons/bs";
import { number, object, string } from "yup";
import "./stockForm.css";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { StockValues } from "@/app/dashboardStock/page";
import Loader from "@/utils/Loader";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  products: GetAllProductsProps | undefined;
  //   productsDescriptions: GetAllProductDescriptionProps | undefined;
  mutateAsync: UseMutateAsyncFunction<
    void,
    Error,
    {
      productDescriptionCode: string;
      quantity: number;
      productDescription: string;
      productCode: string;
      productType: string;
      productCategoryCode: string;
      stockCode: string;
    },
    unknown
  >;
  formValues: StockValues;
}

export default function UpdateStockForm({
  setShow,
  show,
  products,
  mutateAsync,
  formValues,
}: Props) {
  const validationSchema = object().shape({
    productCode: string().required(),
    productDescriptionCode: string().required(),
    productDescription: string().required(),
    productType: string().required(),
    productCategoryCode: string().required(),
    stockCode: string().required(),
    quantity: number().required(),
  });

  const {
    values,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      productCode: "",
      productDescriptionCode: "",
      productDescription: "",
      productType: "",
      productCategoryCode: "",
      stockCode: "",
      quantity: "",
    },
    validationSchema,
    onSubmit: async (
      {
        productCode,
        productDescription,
        productDescriptionCode,
        productType,
        quantity,
        productCategoryCode,
        stockCode,
      },
      { resetForm, setSubmitting }
    ) => {
      await mutateAsync({
        productCode,
        productDescription,
        productDescriptionCode,
        productType,
        quantity: Number(quantity),
        productCategoryCode,
        stockCode,
      }).then(() => {
        resetForm();
        setSubmitting(false);
        setShow(false);
      });
    },
  });

  useEffect(() => {
    setFieldValue("productCode", formValues.productCode, true);
    setFieldValue("productCategoryCode", formValues.productCategoryCode, true);
    setFieldValue("productDescription", formValues.productDescription, true);
    setFieldValue(
      "productDescriptionCode",
      formValues.productDescriptionCode,
      true
    );
    setFieldValue("productCategoryCode", formValues.productCategoryCode, true);
    setFieldValue("productType", formValues.productType, true);
    setFieldValue("quantity", formValues.quantity, true);
    setFieldValue("stockCode", formValues.stockCode, true);
  }, [formValues.stockCode]);
  return (
    <Drawer
      title="Add a stock"
      placement="right"
      width={500}
      onClose={() => setShow(false)}
      open={show}
    >
      <form className="stockForm" onSubmit={handleSubmit}>
        <div className="stockForm_group">
          <label htmlFor="productCode">Product Code</label>
          <select
            value={values.productCode}
            name="productCode"
            id="productCode"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {products?.productDtoList.map(({ code }) => (
              <option key={code}>{code}</option>
            ))}
          </select>
          {errors.productCode && touched.productCode && (
            <div className="error_message">{errors.productCode}</div>
          )}
        </div>

        <div className="stockForm_group">
          <label htmlFor="productDescriptionCode" className="overflow-hidden">
            Product Description Code
          </label>
          <input
            placeholder="Product Description Code"
            name="productDescriptionCode"
            id="productDescriptionCode"
            value={values.productDescriptionCode}
            onChange={handleChange}
            type="text"
          />
          {errors.productDescriptionCode && touched.productDescriptionCode && (
            <div className="error_message">{errors.productDescriptionCode}</div>
          )}
        </div>

        <div className="stockForm_group">
          <label htmlFor="productDescription">Product Description</label>
          <input
            value={values.productDescription}
            name="productDescription"
            placeholder="Product Description"
            onChange={handleChange}
            id="productDescription"
            type="text"
          />
          {errors.productDescription && touched.productDescription && (
            <div className="error_message">{errors.productDescription}</div>
          )}
        </div>

        <div className="stockForm_group">
          <label htmlFor="productCategoryCode">Product Category Code</label>
          <input
            value={values.productCategoryCode}
            name="productCategoryCode"
            placeholder="Product Description"
            onChange={handleChange}
            id="productCategoryCode"
            type="text"
          />
          {errors.productCategoryCode && touched.productCategoryCode && (
            <div className="error_message">{errors.productCategoryCode}</div>
          )}
        </div>

        <div className="stockForm_group">
          <label htmlFor="productType">Product Type</label>
          <input
            value={values.productType}
            onChange={handleChange}
            name="productType"
            placeholder="Product Type"
            id="productType"
            type="text"
          />
          {errors.productType && touched.productType && (
            <div className="error_message">{errors.productType}</div>
          )}
        </div>

        <div className="stockForm_group">
          <label htmlFor="productType">Product Type</label>
          <input
            value={values.stockCode}
            onChange={handleChange}
            name="stockCode"
            placeholder="Product Type"
            id="stockCode"
            type="text"
          />
          {errors.stockCode && touched.stockCode && (
            <div className="error_message">{errors.stockCode}</div>
          )}
        </div>

        <div className="stockForm_group">
          <label htmlFor="quantity">Quantity</label>
          <input
            value={values.quantity}
            onChange={handleChange}
            name="quantity"
            placeholder="Quantity"
            id="quantity"
            type="number"
          />
          {errors.quantity && touched.quantity && (
            <div className="error_message">{errors.quantity}</div>
          )}
        </div>

        <button
          type="submit"
          className="submit_btn overflow-hidden mt-3"
          disabled={isSubmitting}
        >
          <BsUpload /> Add Stock
        </button>
      </form>
      {isSubmitting && <Loader />}
    </Drawer>
  );
}
