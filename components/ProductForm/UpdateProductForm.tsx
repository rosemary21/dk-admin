"use client";

import { Drawer } from "antd";
import { BsUpload } from "react-icons/bs";
import "./ProductForm.scss";
import { useEffect } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onClose: () => void;
  productFormValues: {
    code: string;
    type: string;
  };
  updateProductAsync: UseMutateAsyncFunction<
    void,
    Error,
    {
      code: string;
      type: string;
    },
    unknown
  >;
}

const UpdateProductForm = ({
  open,
  onClose,
  productFormValues,
  updateProductAsync,
}: Props) => {
  const validationSchema = object().shape({
    code: string().required("Code is required"),
    type: string().required("Type is required"),
  });

  const {
    handleSubmit,
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      code: "",
      type: "",
    },
    validationSchema,
    onSubmit: async ({ code, type }, { resetForm, setSubmitting }) => {
      await updateProductAsync({ code, type }).then(() => {
        setSubmitting(false);
        resetForm();
        onClose();
        // window.location.reload()
      });
    },
  });

  useEffect(() => {
    setFieldValue("code", productFormValues.code);
    setFieldValue("type", productFormValues.type);
  }, [productFormValues.code]);

  return (
    <Drawer
      title="Update a product"
      placement="right"
      width={500}
      onClose={onClose}
      open={open}
    >
      <form className="drawer_forms" onSubmit={handleSubmit}>
        <div className="form_group_col">
          <label htmlFor="code">Code</label>
          <input
            name="code"
            type="text"
            id="code"
            placeholder="Code"
            value={values.code}
            onChange={handleChange}
          />
          {errors.code && touched.code ? (
            <div className="error_message">{errors.code}</div>
          ) : null}
        </div>

        <div className="form_group_col">
          <label htmlFor="type">Type</label>
          <input
            name="type"
            id="type"
            type="text"
            placeholder="Type"
            value={values.type}
            onChange={handleChange}
          />
          {errors.type && touched.type ? (
            <div className="error_message">{errors.type}</div>
          ) : null}
        </div>

        <button type="submit" className="submit_btn" disabled={isSubmitting}>
          <BsUpload className="submit_icon" />
          Submit
        </button>
      </form>
    </Drawer>
  );
};

export default UpdateProductForm;
