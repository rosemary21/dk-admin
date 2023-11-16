import { Context } from "@/contexts";
import { Drawer } from "antd";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { BsCamera, BsUpload } from "react-icons/bs";
import { number, object, string } from "yup";
import "./ProductDescriptionForm.css";
import { currencies } from "@/data";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import Loader from "@/utils/Loader";
import { ProductDescriptionValues } from "@/app/dashboardProductDescription/page";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  productCategoryCodes: string[] | undefined;
  productCodes: string[] | undefined;
  mutateAsync: UseMutateAsyncFunction<
    void,
    Error,
    {
      descriptionFileInput: File[];
      amount: string;
      description: string;
      currency: string;
      productCode: string;
      code: string;
      productCategoryCode: string;
      productSize: string;
      location: string;
      landDocFileInput: File[];
      percentageDiscount: string;
      videoListFileInput: File[];
    },
    unknown
  >;
  formValues: ProductDescriptionValues;
}

export default function UpdateProductDescription({
  show,
  setShow,
  productCategoryCodes,
  productCodes,
  mutateAsync,
  formValues,
}: Props) {
  const {
    landDocName,
    setLandDocName,
    getFiles,
    handleFileChange,
    videoListName,
    setVideoListName,
    productName,
    setProductName,
    videoListFileInput,
    setVideoListFileInput,
    landDocFileInput,
    setLandDocFileInput,
    descriptionFileInput,
    setDescriptionFileInput,
  } = useContext(Context);

  const validationSchema = object().shape({
    description: string().required("this field is required"),
    code: string().required("this field is required"),
    currency: string().required("this field is required"),
    amount: string().required("this field is required"),
    productSize: string().required("this field is required"),
    location: string().required("this field is required"),
    productCode: string().required("this field is required"),
    productCategoryCode: string().required("this field is required"),
    percentageDiscount: string().required("this field is required"),
  });

  const {
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      description: "",
      code: "",
      currency: "",
      amount: "",
      productSize: "",
      location: "",
      productCode: "",
      productCategoryCode: "",
      percentageDiscount: "",
    },
    validationSchema,
    onSubmit: async (
      {
        amount,
        code,
        currency,
        description,
        location,
        percentageDiscount,
        productCategoryCode,
        productCode,
        productSize,
      },
      { resetForm, setSubmitting }
    ) => {
      await mutateAsync({
        amount,
        code,
        currency,
        description,
        descriptionFileInput,
        landDocFileInput,
        location,
        percentageDiscount,
        productCategoryCode,
        productCode,
        productSize,
        videoListFileInput,
      }).then(() => {
        resetForm();
        setSubmitting(false);
        setLandDocName([]);
        setVideoListName([]);
        setProductName([]);
        setShow(false);
      });
    },
  });

  useEffect(() => {
    setFieldValue("amount", formValues.amount, true);
    setFieldValue("code", formValues.code, true);
    setFieldValue("description", formValues.description, true);
    setFieldValue("location", formValues.location, true);
    setFieldValue("percentageDiscount", formValues.percentageDiscount, true);
    setFieldValue("productCategoryCode", formValues.productCategoryCode, true);
    setFieldValue("productCode", formValues.productCode, true);
    setFieldValue("productSize", formValues.productSize, true);
    setFieldValue("currency", formValues.currency, true);
    setFieldValue("productCode", formValues.productCode, true);
    setFieldValue("productCategoryCode", formValues.productCategoryCode, true);
  }, [formValues.code]);

  return (
    <Drawer
      title="Update a product description"
      placement="right"
      width={500}
      onClose={() => setShow(false)}
      open={show}
    >
      <div className="imgList">
        {productName.length < 4 && productName.length > 0 ? (
          productName.map((img, idx) => (
            <img
              className="addImage-img"
              key={idx}
              src={img}
              alt={`img-${productName[idx]}`}
            />
          ))
        ) : (
          <img
            className="addImage-img"
            src="/Admin/product-img.png"
            alt="product-img"
          />
        )}
      </div>

      <form className="drawer_forms" onSubmit={handleSubmit}>
        <div className="addProduct-name">
          <div className="w-full">
            <label htmlFor="prod_description" className="overflow-hidden">
              Description
            </label>
            <input
              value={values.description}
              onChange={handleChange}
              id="prod_description"
              type="text"
              name="description"
              autoComplete="no"
            />
            {errors.description && touched.description && (
              <div className="error_message">{errors.description}</div>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="code" className="overflow-hidden">
              Code
            </label>
            <input
              value={values.code}
              onChange={handleChange}
              name="code"
              id="code"
              type="text"
              autoComplete="no"
            />
            {errors.code && touched.code && (
              <div className="error_message">{errors.code}</div>
            )}
          </div>

          <input
            type="file"
            id="selectFile"
            onChange={(e) =>
              handleFileChange(e, setDescriptionFileInput, setProductName)
            }
            accept="image/*"
            multiple
            hidden
          />

          <button
            type="button"
            className="addImage-btn"
            onClick={(e) => getFiles(e, "selectFile")}
          >
            <BsCamera className="addImage-icon" />
            <p>Click to upload multiple images of the product</p>
          </button>
        </div>

        <div className="addProduct-price">
          <div className="addProduct-category">
            <label htmlFor="currency">Currency</label>
            <select
              value={values.currency}
              onChange={handleChange}
              onBlur={handleBlur}
              name="currency"
              id="currency"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            {errors.currency && touched.currency && (
              <div className="error_message">{errors.currency}</div>
            )}
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              value={values.amount}
              onChange={handleChange}
              name="amount"
              id="amount"
              type="text"
            />
            {errors.amount && touched.amount && (
              <div className="error_message">{errors.amount}</div>
            )}
          </div>
        </div>

        <div className="addProduct-price">
          <div>
            <label htmlFor="productSize">Product Size</label>
            <input
              value={values.productSize}
              onChange={handleChange}
              name="productSize"
              id="productSize"
              type="text"
              autoComplete="no"
            />
            {errors.productSize && touched.productSize && (
              <div className="error_message">{errors.productSize}</div>
            )}
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              value={values.location}
              onChange={handleChange}
              name="location"
              id="location"
              type="text"
              autoComplete="no"
            />
            {errors.location && touched.location && (
              <div className="error_message">{errors.location}</div>
            )}
          </div>
        </div>

        <div className="addProduct-price">
          <div className="addProduct-category">
            <label htmlFor="prod_code">Code</label>
            <select
              value={values.productCode}
              onBlur={handleBlur}
              onChange={handleChange}
              name="productCode"
              id="prod_code"
              autoComplete="no"
            >
              {productCodes &&
                productCodes.map((code) => (
                  <option value={code} key={code}>
                    {code}
                  </option>
                ))}
            </select>
            {errors.productCode && touched.productCode && (
              <div className="error_message">{errors.productCode}</div>
            )}
          </div>
          <div className="addProduct-category">
            <label htmlFor="prod_cat_code">Product Category Code</label>
            <select
              value={values.productCategoryCode}
              onChange={handleChange}
              onBlur={handleBlur}
              name="productCategoryCode"
              id="prod_cat_code"
            >
              {productCategoryCodes &&
                productCategoryCodes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
            </select>
            {errors.productCategoryCode && touched.productCategoryCode && (
              <div className="error_message">{errors.productCategoryCode}</div>
            )}
          </div>
        </div>

        <div className="addProduct-name">
          <div className="w-full">
            <label htmlFor="percentageDiscount" className="overflow-hidden">
              Discount (%)
            </label>
            <input
              value={values.percentageDiscount}
              onChange={handleChange}
              name="percentageDiscount"
              id="percentageDiscount"
              type="text"
              autoComplete="no"
            />
            {errors.percentageDiscount && touched.percentageDiscount && (
              <div className="error_message">{errors.percentageDiscount}</div>
            )}
          </div>
        </div>

        <div className="addProduct-price">
          <div>
            <input
              type="file"
              hidden
              multiple
              accept="application/pdf"
              id="landDoc_input"
              onChange={(e) =>
                handleFileChange(e, setLandDocFileInput, setLandDocName)
              }
            />
            <label htmlFor="landDoc">Upload land doc</label>
            <input
              value={`📃 Land Doc  ${landDocName.length > 0 ? "✔" : ""}`}
              onClick={(e) => getFiles(e, "landDoc_input")}
              type="button"
              id="landDoc"
              style={{
                backgroundColor: landDocName.length > 0 ? "green" : "#F1F4FA",
                color: landDocName.length > 0 ? "#fff" : "#000",
              }}
              autoComplete="no"
            />
          </div>

          <div className="addProduct-category">
            <input
              type="file"
              hidden
              multiple
              accept="video/*"
              id="videoList_input"
              onChange={(e) =>
                handleFileChange(e, setVideoListFileInput, setVideoListName)
              }
            />
            <label htmlFor="videoList">Upload video list</label>
            <input
              value={`📷 Video List ${videoListName.length > 0 ? "✔" : ""}`}
              onClick={(e) => getFiles(e, "videoList_input")}
              type="button"
              id="videoList"
              style={{
                backgroundColor: videoListName.length > 0 ? "green" : "#F1F4FA",
                color: videoListName.length > 0 ? "#fff" : "#000",
              }}
              autoComplete="no"
            />
          </div>
        </div>

        <button type="submit" className="uploadProduct" disabled={isSubmitting}>
          <BsUpload className="submit_icon" />
          Submit
        </button>
      </form>

      {isSubmitting && <Loader />}
    </Drawer>
  );
}
