import { Drawer } from "antd";
import { Dispatch, SetStateAction } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { BsUpload } from "react-icons/bs";
import "./ProductForm.scss";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  mutateAsync: UseMutateAsyncFunction<
    void,
    Error,
    {
      code: string;
      type: string;
    },
    unknown
  >;
}

const AddProductForm = ({ show, setShow, mutateAsync }: Props) => {
  const validationSchema = object().shape({
    code: string().required("This field is required"),
    type: string().required("This field is required"),
  });

  const { errors, touched, isSubmitting, handleSubmit, values, handleChange } =
    useFormik({
      initialValues: {
        code: "",
        type: "",
      },
      validationSchema,
      onSubmit: async ({ code, type }, { resetForm, setSubmitting }) => {
        await mutateAsync({ code, type }).then(() => {
          setSubmitting(false);
          resetForm();
          setShow(false);
        });
      },
    });

  return (
    <Drawer
      title="Add a product"
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
          <label htmlFor="type">Type</label>
          <input
            name="type"
            id="type"
            type="text"
            value={values.type}
            onChange={handleChange}
            placeholder="Type"
          />
        </div>
        {errors.type && touched.type ? (
          <div className="error_message">{errors.type}</div>
        ) : null}
        <button type="submit" className="submit_btn" disabled={isSubmitting}>
          <BsUpload className="submit_icon" />
          Submit
        </button>
      </form>
    </Drawer>
  );
};

export default AddProductForm;
