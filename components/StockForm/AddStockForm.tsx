import { GetAllProductDescriptionProps, GetAllProductsProps } from "@/types";
import { Drawer } from "antd";
import { useFormik } from "formik";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { BsUpload } from "react-icons/bs";
import { number, object, string } from "yup";
import "./stockForm.css";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  products: GetAllProductsProps | undefined;
  //   productsDescriptions: GetAllProductDescriptionProps | undefined;
  addStockAsync: UseMutateAsyncFunction<
    void,
    Error,
    {
      productDescriptionCode: string;
      quantity: number;
      productDescription: string;
      productCode: string;
      productType: string;
    },
    unknown
  >;
}

export default function AddStockForm({
  setShow,
  show,
  products,
  addStockAsync,
}: Props) {
  const validationSchema = object().shape({
    productCode: string().required(),
    productDescriptionCode: string().required(),
    productDescription: string().required(),
    productType: string().required(),
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
      },
      { resetForm, setSubmitting }
    ) => {
      await addStockAsync({
        productCode,
        productDescription,
        productDescriptionCode,
        productType,
        quantity: Number(quantity),
      }).then(() => {
        resetForm();
        setSubmitting(false);
      });
    },
  });
  return (
    // <Drawer
    //   title="Add a stock"
    //   placement="right"
    //   width={500}
    //   onClose={() => setShow(false)}
    //   open={show}
    // >
    //   <form className="stockForm" onSubmit={handleSubmit}>
    //     <div className="stockForm_group">
    //       <label htmlFor="productCode">Product Code</label>
    //       <select
    //         value={values.productCode}
    //         name="productCode"
    //         id="productCode"
    //         onChange={handleChange}
    //         onBlur={handleBlur}
    //       >
    //         {products?.productDtoList.map(({ code }) => (
    //           <option key={code}>{code}</option>
    //         ))}
    //       </select>
    //       {errors.productCode && touched.productCode && (
    //         <div className="error_message">{errors.productCode}</div>
    //       )}
    //     </div>

    //     <div className="stockForm_flex_group">
    //       <div className="lg">
    //         <label htmlFor="productDescriptionCode" className="overflow-hidden">
    //           Product Description Code
    //         </label>
    //         <select
    //           value={values.productDescriptionCode}
    //           name="productDescriptionCode"
    //           onChange={handleChange}
    //           id="productDescriptionCode"
    //         >
    //           {productsDescriptions &&
    //             productsDescriptions.productDescriptionDtoList.map(
    //               ({ code }) => <option value={code}>{code}</option>
    //             )}
    //         </select>
    //       </div>
    //       <div className="sm">
    //         <label htmlFor="productDescriptionCode" className="overflow-hidden">
    //           PageNo
    //         </label>
    //         <select
    //           value={values.productDescriptionCode}
    //           name="productDescriptionCode"
    //           onChange={handleChange}
    //           id="productDescriptionCode"
    //         >
    //           {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((number) => (
    //             <option key={number}>{number}</option>
    //           ))}
    //         </select>
    //       </div>
    //       {errors.productCode && touched.productCode && (
    //         <div className="error_message">{errors.productCode}</div>
    //       )}
    //     </div>

    //     <div className="stockForm_group">
    //       <label htmlFor="productDescription">Product Description</label>
    //       <input
    //         value={values.productDescription}
    //         name="productDescription"
    //         onChange={handleChange}
    //         id="productDescription"
    //         type="text"
    //         disabled
    //       />
    //       {errors.productCode && touched.productCode && (
    //         <div className="error_message">{errors.productCode}</div>
    //       )}
    //     </div>

    //     <div className="stockForm_group">
    //       <label htmlFor="productType">Product Type</label>
    //       <input
    //         value={values.productType}
    //         onChange={handleChange}
    //         name="productType"
    //         id="productType"
    //         type="text"
    //       />
    //       {errors.productCode && touched.productCode && (
    //         <div className="error_message">{errors.productCode}</div>
    //       )}
    //     </div>

    //     <div className="stockForm_group">
    //       <label htmlFor="quantity">Quantity</label>
    //       <input
    //         value={values.quantity}
    //         onChange={handleChange}
    //         name="quantity"
    //         id="quantity"
    //         type="number"
    //       />
    //       {errors.productCode && touched.productCode && (
    //         <div className="error_message">{errors.productCode}</div>
    //       )}
    //     </div>

    //     <button
    //       className="submit_btn overflow-hidden mt-3"
    //       disabled={isSubmitting}
    //     >
    //       <BsUpload /> Add Stock
    //     </button>
    //   </form>
    // </Drawer>

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
    </Drawer>
  );
}
