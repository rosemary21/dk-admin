"use client";

import { LoginProps, LogoutProps } from "@/types";
import { LINKS, adminToken, adminUser, dker, getToken } from "@/utils/Links";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import HttpErrorHandler from "@/utils/ErrorHandler";
import openNotification from "@/utils/openNotification";
import axios, { AxiosError } from "axios";
import clearCookies from "@/utils/clearCookies";

const AuthService = () => {
  const [loginLoader, setLoginLoader] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const loginAPI = async (payload: { userName: string; password: string }) => {
    const url =
      (process.env.NEXT_PUBLIC_BASE_URL as string) + "/api/v1/login/admin";
    const data = JSON.stringify(payload);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    try {
      setLoginLoader(true);
      await axios
        .request(config)
        .then((response) => {
          const {
            emailAddress,
            token,
            responseDto: { code, message },
          } = response.data as LoginProps;
          if (code === dker) {
            setError(message);
            return;
          } else {
            Cookies.set(adminUser, emailAddress);
            Cookies.set(adminToken, token);
            router.push(LINKS.dashboardHome);
          }
        })
        .catch((error: AxiosError) => {
          setError(HttpErrorHandler(error));
        })
        .finally(() => {
          setLoginLoader(false);
        });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const logOutAPI = async () => {
    const apiKey = getToken();
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/logout";
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url,
      headers: {
        apiKey,
      },
    };

    try {
      setLoginLoader(true);
      await axios
        .request(config)
        .then((response) => {
          const {
            resp: { code, message },
          } = response.data as LogoutProps;
          if (code === dker) {
            setError(message);
            return;
          }
          clearCookies()
          localStorage.clear();
          router.push(LINKS.dashboardLogin);
        })
        .catch((error: AxiosError) => {
          setError(HttpErrorHandler(error));
        })
        .finally(() => {
          setLoginLoader(false);
        });
    } catch (error: any) {
      setError(error);
    }
  }

  return { loginAPI, logOutAPI, loginLoader, error, setError };
};

export default AuthService;
