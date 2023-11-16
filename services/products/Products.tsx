import {
  AddUpdateProductCategoryProps,
  AddUpdateProductProps,
  GetAllProductCategoriesProps,
  GetAllProductDescriptionProps,
  GetAllProductsProps,
  ProductDescriptionProps,
  ProductProps,
  ResponseDtoProps,
} from "@/types";
import ErrorHandler from "@/utils/ErrorHandler";
import { dker, getToken } from "@/utils/Links";
import axios, { AxiosError } from "axios";
import { useState } from "react";

const ProductsService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<ProductProps[]>([]);

  const apiKey = getToken();

  const getAllProducts = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/products/all";
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url,
      headers: {
        apiKey,
      },
    };
    const data = (await axios.request(config)).data as GetAllProductsProps;
    return data;
  };

  const addProduct = async (options: { code: string; type: string }) => {
    const { code, type } = options;
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/products/add";

    const data = JSON.stringify({
      code,
      type,
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
        const {
          responseDto: { code, message },
        } = response.data as AddUpdateProductProps;
        if (code === dker) {
          setError(message);
          return;
        }
      })
      .catch((error: AxiosError) => {
        setError(ErrorHandler(error));
      });
  };

  const updateProduct = async (options: { code: string; type: string }) => {
    const { code, type } = options;
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/products/update";
    const data = JSON.stringify({
      code,
      type,
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

    axios
      .request(config)
      .then((response) => {
        const {
          responseDto: { code, message },
        } = response.data as AddUpdateProductProps;
        if (code === dker) {
          setError(message);
          return;
        }
      })
      .catch((error: AxiosError) => {
        setError(ErrorHandler(error));
      });
  };

  const getAllProductCategories = async (pageNo: number) => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/productcategorycode/all/page";

    const data = JSON.stringify({
      pageSize: 10,
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

    const response = (await axios.request(config))
      .data as GetAllProductCategoriesProps;
    return response;
  };

  const getAllProductCategoriesPages = async () => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/productcategorycode/all";

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url,
      headers: {
        apiKey,
      },
    };

    const response = (await axios.request(config))
      .data as GetAllProductCategoriesProps;
    return response;
  };

  const addProductCategory = async (payload: {
    category: string;
    code: string;
    productCode: string;
  }) => {
    const { category, code, productCode } = payload;
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/productcategorycode/add";

    const data = JSON.stringify({
      category,
      code,
      productCode,
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
        const {
          responseDto: { code, message },
        } = response.data as AddUpdateProductCategoryProps;
        if (code === dker) {
          setError(message);
          return;
        }
      })
      .catch((error: AxiosError) => {
        setError(ErrorHandler(error));
      });
  };

  const updateProductCategory = async (payload: {
    category: string;
    code: string;
    productCode: string;
  }) => {
    const { category, code, productCode } = payload;
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/productcategorycode/update";

    const data = JSON.stringify({
      category,
      code,
      productCode,
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
        const {
          responseDto: { code, message },
        } = response.data as AddUpdateProductCategoryProps;
        if (code === dker) {
          setError(message);
          return;
        }
      })
      .catch((error: AxiosError) => {
        setError(ErrorHandler(error));
      });
  };

  const getAllProductDescriptions = async (
    pageNo: number,
    productCode: string
  ) => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/productdescription/all/page";
    const data = JSON.stringify({
      pageSize: 10,
      pageNo,
      productCode,
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

    const response = (await axios.request(config))
      .data as GetAllProductDescriptionProps;
    return response;
  };

  const addProductDescription = async (payload: {
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
  }) => {
    const {
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
    } = payload;
    const url =
      process.env.NEXT_PUBLIC_BASE_URL +
      "/api/v1/productdescription/upload/photo";

    const headers = new Headers();
    headers.append("apiKey", apiKey);
    const formdata = new FormData();
    for (let i = 0; i < descriptionFileInput.length; i++) {
      formdata.append(
        "files",
        descriptionFileInput[i],
        descriptionFileInput[i].name
      );
    }
    formdata.append("amount", amount);
    formdata.append("description", description);
    formdata.append("currency", currency);
    formdata.append("productCode", productCode);
    formdata.append("code ", code);
    formdata.append("productCategoryCode", productCategoryCode);
    formdata.append("productSize", productSize);
    formdata.append("location", location);
    for (let i = 0; i < landDocFileInput.length; i++) {
      formdata.append("landDoc", landDocFileInput[i], landDocFileInput[i].name);
    }
    formdata.append("percentageDiscount", percentageDiscount);
    for (let i = 0; i < videoListFileInput.length; i++) {
      formdata.append(
        "videoList",
        videoListFileInput[i],
        videoListFileInput[i].name
      );
    }
    const options = {
      method: "POST",
      headers,
      body: formdata,
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then(() => {})
      .catch((error) => {
        setError(error.message);
      });
  };

  // const getAProductDescription = async (id: string) => {
  //   const url =
  //     process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/productdescription/id";
  //   const data = JSON.stringify({ id });

  //   const config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url,
  //     headers: {
  //       apiKey,
  //       "Content-Type": "application/json",
  //     },
  //     data,
  //   };

  //   const result = (await axios.request(config)) as {
  //     responseDto: ResponseDtoProps;
  //     productDescriptionDtoList: ProductDescriptionProps;
  //   };

  //   return result.productDescriptionDtoList;
  // };

  const updateProductDescription = async (payload: {
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
  }) => {
    const {
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
    } = payload;
    const url =
      process.env.NEXT_PUBLIC_BASE_URL +
      "/api/v1/productdescription/upload/update";

    const headers = new Headers();
    headers.append("apiKey", apiKey);
    const formdata = new FormData();
    for (let i = 0; i < descriptionFileInput.length; i++) {
      formdata.append(
        "files",
        descriptionFileInput[i],
        descriptionFileInput[i].name
      );
    }
    formdata.append("amount", amount);
    formdata.append("description", description);
    formdata.append("currency", currency);
    formdata.append("productCode", productCode);
    formdata.append("code ", code);
    formdata.append("productCategoryCode", productCategoryCode);
    formdata.append("productSize", productSize);
    formdata.append("location", location);
    for (let i = 0; i < landDocFileInput.length; i++) {
      formdata.append("landDoc", landDocFileInput[i], landDocFileInput[i].name);
    }
    formdata.append("percentageDiscount", percentageDiscount);
    for (let i = 0; i < videoListFileInput.length; i++) {
      formdata.append(
        "videoList",
        videoListFileInput[i],
        videoListFileInput[i].name
      );
    }
    const options = {
      method: "POST",
      headers,
      body: formdata,
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then(() => {})
      .catch((error) => {
        setError(error.message);
      });
  };

  return {
    isLoading,
    error,
    setError,
    getAllProducts,
    products,
    addProduct,
    updateProduct,
    getAllProductCategories,
    getAllProductCategoriesPages,
    addProductCategory,
    updateProductCategory,
    getAllProductDescriptions,
    addProductDescription,
    updateProductDescription,
  };
};

export default ProductsService;
