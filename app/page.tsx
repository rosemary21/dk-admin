"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import AuthService from "@/services/auth/auth";
import Loader from "@/utils/Loader";

export default function Login() {
  const [inputType, setInputType] = useState("password");
  const { loginAPI, error, setError, loginLoader } = AuthService();
  const router = useRouter();

  const validationSchema = object().shape({
    userName: string()
      .required("UserName field is required")
      .email("This field must be a valid email"),
    password: string()
      .min(4, "password must be atleast 4 characters")
      .required("Password field is required"),
  });

  const { handleChange, values, handleSubmit, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (
        { password, userName },
        { resetForm, setSubmitting }
      ) => {
        await loginAPI({ password, userName }).then(() => {
          resetForm();
          setSubmitting(false);
        });
      },
    });

  function changePasswordInputType() {
    if (inputType === "password" && values.password !== "") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }

  return (
    <>
      <div className={styles.adminLoginWrapper}>
        <img src="/logo.png" alt="logo" />
        <h1>Admin Dashboard</h1>
        <p>
          We'd love to hear how we can leverage the internet to solving your
          problems. Please fill out this form.
        </p>

        <div className={styles.adminLoginFormContainer}>
          <p>Login</p>
          <hr className={styles.adminLoginForLine} />

          <p className={styles.pText}>Log in with your Email and password</p>

          <form className={styles.adminLoginForm} onSubmit={handleSubmit}>
            <input
              value={values.userName}
              onChange={handleChange}
              name="userName"
              type="email"
              placeholder="Email"
              required
            />
            {errors.userName && touched.userName && (
              <div className="error_message mt-2">{errors.userName}</div>
            )}

            <div className={styles.inputGroup}>
              <input
                value={values.password}
                onChange={handleChange}
                name="password"
                type={inputType}
                placeholder="Password"
                required
              />
              <p onClick={changePasswordInputType}>
                {inputType === "password" ? "show" : "hide"}
              </p>
            </div>
            {errors.password && touched.password && (
              <div className="error_message mt-2">{errors.password}</div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.caBtn}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>

      {loginLoader && <Loader />}
    </>
  );
}
