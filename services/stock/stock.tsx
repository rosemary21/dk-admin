"use client";

import { AddUpdateDeleteStockProps, GetAllStocks } from "@/types";
import { dker, getToken } from "@/utils/Links";
import axios from "axios";
import { useState } from "react";

export default function StockServices() {
  const [error, setError] = useState("");
  const apiKey = getToken();

  const getAllStock = async (pageNo: number) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/stock/all/page";

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

    const result = (await axios.request(config)).data as GetAllStocks;
    return result.stockDtoList;
  };

  const addStock = async (payload: {
    productDescriptionCode: string;
    quantity: number;
    productDescription: string;
    productCode: string;
    productType: string;
  }) => {
    const {
      productCode,
      productDescription,
      productDescriptionCode,
      productType,
      quantity,
    } = payload;
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/stock/add";

    const data = JSON.stringify({
      productDescriptionCode,
      quantity,
      productDescription,
      productCode,
      productType,
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

    await axios
      .request(config)
      .then((response) => {
        const result = response.data as AddUpdateDeleteStockProps;
        if (result.responseDto.code === dker) {
          setError(result.responseDto.message);
          return;
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const updateStock = async (payload: {
    productDescriptionCode: string;
    quantity: number;
    productDescription: string;
    productCode: string;
    productType: string;
    productCategoryCode: string;
    stockCode: string;
  }) => {
    const {
      productCode,
      productDescription,
      productDescriptionCode,
      productType,
      quantity,
      productCategoryCode,
      stockCode,
    } = payload;
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/stock/update";
    const data = JSON.stringify({
      productDescriptionCode,
      quantity,
      productDescription,
      productCode,
      productType,
      productCategoryCode,
      stockCode,
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

    await axios
      .request(config)
      .then((response) => {
        const result = response.data as AddUpdateDeleteStockProps;
        if (result.responseDto.code === dker) {
          setError(result.responseDto.message);
          return;
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return { getAllStock, error, addStock, updateStock };
}
