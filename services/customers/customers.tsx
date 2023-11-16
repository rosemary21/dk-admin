"use client";

import { GetAllCustomersByPage } from "@/types";
import HttpErrorHandler from "@/utils/ErrorHandler";
import { getToken } from "@/utils/Links";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export default function CustomersService() {
  const [error, setError] = useState("");
  const apiKey = getToken();

  const getAllCustomers = async (pageNo: number) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/user/all/page";
    const data = JSON.stringify({
      pageSize: 100,
      pageNo,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url,
      headers: {
        apiKey,
        "Content-Type": "application/json",
      },
      data,
    };

    const result = (await axios.request(config)).data as GetAllCustomersByPage;
    return result;
  };

  const deleteUser = async (userName: string) => {
    // const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/user/delete";

    // const data = JSON.stringify({ userName });

    // const config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url,
    //   headers: {
    //     apiKey,
    //   },
    //   data,
    // };

    // await axios
    //   .request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //     setError(error.message);
    //   });
    alert(userName);
  };

  return { getAllCustomers, deleteUser };
}
