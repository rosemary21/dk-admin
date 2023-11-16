"use client";
import { object, string } from "yup";
import "../ProductForm/ProductForm.scss";
import { useFormik } from "formik";
import { Drawer } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { BsUpload } from "react-icons/bs";
import { ProductProps } from "@/types";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  mutateAsync: UseMutateAsyncFunction<
    void,
    Error,
    {
      category: string;
      code: string;
      productCode: string;
    },
    unknown
  >;
  productDtoList: ProductProps[];
  formValues: {
    category: string;
    code: string;
    productCode: string;
  };
}

export default function UpdateProductCategory({
  mutateAsync,
  setShow,
  show,
  productDtoList,
  formValues,
}: Props) {
  const validationSchema = object().shape({
    code: string().required("Code is required"),
    category: string().required("Category is required"),
    productCode: string().required("Product Code is required"),
  });

  const {
    errors,
    touched,
    handleChange,
    values,
    handleSubmit,
    isSubmitting,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      code: "",
      category: "",
      productCode: "",
    },
    validationSchema,
    onSubmit: async (
      { category, code, productCode },
      { resetForm, setSubmitting }
    ) => {
      await mutateAsync({ category, code, productCode }).then(() => {
        setSubmitting(false);
        resetForm();
        setShow(false);
      });
    },
  });

  useEffect(() => {
    setFieldValue("code", formValues.code, true);
    setFieldValue("category", formValues.category, true);
    setFieldValue("productCode", formValues.productCode, true);
  }, [formValues.code]);
  return (
    <Drawer
      title="Update a product category"
      placement="right"
      width={500}
      onClose={() => setShow(false)}
      open={show}
    >
      <form className="drawer_forms" onSubmit={handleSubmit}>
        <div className="form_group_col">
          <label htmlFor="code">Code</label>
          <input
            name="code"
            type="text"
            id="code"
            value={values.code}
            onChange={handleChange}
            placeholder="Code"
          />{" "}
        </div>
        {errors.code && touched.code ? (
          <div className="error_message">{errors.code}</div>
        ) : null}

        <div className="form_group_col">
          <label htmlFor="category">Category</label>
          <input
            name="category"
            id="category"
            type="text"
            value={values.category}
            onChange={handleChange}
            placeholder="Category"
          />
        </div>
        {errors.category && touched.category ? (
          <div className="error_message">{errors.category}</div>
        ) : null}

        <div className="form_group_col">
          <label htmlFor="productCode">Product Code</label>
          <select
            name="productCode"
            id="productCode"
            value={values.productCode}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {productDtoList.map(({ code }) => (
              <option value={code}>{code}</option>
            ))}
          </select>
        </div>
        {errors.productCode && touched.productCode ? (
          <div className="error_message">{errors.productCode}</div>
        ) : null}

        <button type="submit" className="submit_btn" disabled={isSubmitting}>
          <BsUpload className="submit_icon" />
          Submit
        </button>
      </form>
    </Drawer>
  );
}
