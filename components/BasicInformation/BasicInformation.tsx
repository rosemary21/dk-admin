import { object, ref, string } from "yup";
import "./BasicInformation.css";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { ResponseDtoProps } from "@/types";
import { dker } from "@/utils/Links";
import HttpErrorHandler from "@/utils/ErrorHandler";

export default function BasicInformation({ active }: { active: string }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const validationSchema = object().shape({
    firstName: string().required("First Name is required"),
    lastName: string().required("Last Name is required"),
    email: string()
      .email("This field must be a valid email")
      .required("Email is required"),
    userType: string().required("User Type is required"),
    userName: string().required("UserName is required"),
    password: string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must contain at least one uppercase letter, lowercase letter, one number and 8 or more characters"
      )
      .required("password is required"),
    confirmPassword: string().oneOf([ref("password")], "Passwords must match"),
  });

  const { errors, touched, handleChange, handleSubmit, isSubmitting, values } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        confirmPassword: "",
        userType: "",
        userName: "",
        password: "",
      },
      validationSchema,
      onSubmit: (
        {
          confirmPassword,
          email,
          firstName,
          lastName,
          password,
          userName,
          userType,
        },
        { resetForm, setSubmitting }
      ) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/staff/add";
        const data = JSON.stringify({
          firstName,
          lastName,
          email,
          confirmPassword,
          userType,
          userName,
          password,
        });

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url,
          headers: {
            "Content-Type": "application/json",
          },
          data,
        };

        axios
          .request(config)
          .then((response) => {
            const {
              responseDto: { code, message },
            } = response.data as {
              responseDto: ResponseDtoProps;
              staffDtoList: null;
            };
            if (code === dker) {
              setError(message);
              return;
            } else {
              resetForm();
              setSubmitting(false);
              setSuccess(message);
            }
          })
          .catch((error) => {
            setError(HttpErrorHandler(error));
          });
      },
    });
  return (
    <form
      style={{ display: active === "basicInformation" ? "block" : "none" }}
      className="basicInformationWrapper"
      onSubmit={handleSubmit}
    >
      <h2 className="settings_title">Basic Information</h2>
      <div id="liner" />

      <div className="mt-2 flex items-baseline gap-2 w-3/4">
        <div className="flex flex-col gap-1 w-full">
          <label className="settings_label" htmlFor="firstName">
            First Name
          </label>
          <input
            className="settings_input"
            type="text"
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
          />
          {errors.firstName && touched.firstName && (
            <div className="error_message mt-1">{errors.firstName}</div>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="settings_label" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="settings_input"
            type="text"
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
          />
          {errors.lastName && touched.lastName && (
            <div className="error_message mt-1">{errors.lastName}</div>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-1 w-3/4">
        <label htmlFor="emailAdd" className="settings_label">
          Email address
        </label>
        <input
          className="settings_input"
          type="password"
          id="emailAdd"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && touched.email && (
          <div className="error_message mt-1">{errors.email}</div>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-1 w-3/4">
        <label htmlFor="userType" className="settings_label">
          User Type
        </label>
        <input
          className="settings_input"
          type="text"
          id="userType"
          name="userType"
          value={values.userType}
          onChange={handleChange}
        />
        {errors.userType && touched.userType && (
          <div className="error_message mt-1">{errors.userType}</div>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-1 w-3/4">
        <label htmlFor="userName" className="settings_label">
          User Name
        </label>
        <input
          className="settings_input"
          type="text"
          id="userName"
          name="userName"
          value={values.userName}
          onChange={handleChange}
        />
        {errors.userName && touched.userName && (
          <div className="error_message mt-1">{errors.userName}</div>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2 w-3/4">
        <div className="flex flex-col gap-1 w-full">
          <label className="settings_label" htmlFor="password">
            Password
          </label>
          <input
            className="settings_input"
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && touched.password && (
            <div className="error_message mt-1">{errors.password}</div>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="settings_label" htmlFor="addConfirmPassword">
            Confirm Password
          </label>
          <input
            className="settings_input"
            type="password"
            name="confirmPassword"
            id="addConfirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <div className="error_message mt-1">{errors.confirmPassword}</div>
          )}
        </div>
      </div>

      <div className="mt-4 w-full flex justify-end">
        <button
          type="submit"
          className="setting_submit_btn"
          disabled={isSubmitting}
        >
          Save changes
        </button>
      </div>
    </form>
  );
}
