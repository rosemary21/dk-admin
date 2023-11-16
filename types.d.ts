import { ProductProps, GetAllProductCategoriesProps } from "./types.d";

export type ResponseDtoProps = {
  code: string;
  message: string;
};

export type LogoutProps = {
  resp: ResponseDtoProps;
  firstTimeLogin: boolean;
};

export type LoginProps = {
  responseDto: ResponseDtoProps;
  token: string;
  emailAddress: string;
  userName: any;
};

export type ProductProps = {
  code: string;
  type: string;
  id: number;
  createdOn: number | any;
  productDtoList: any;
};

export type GetAllProductsProps = {
  responseDto: ResponseDtoProps;
  productDtoList: ProductProps[];
};

export type AddUpdateProductProps = {
  responseDto: ResponseDtoProps;
  productDtoList: any;
};

export type ProductCategoryProps = {
  category: string;
  code: string;
  productCode?: string;
  id: number;
  version: number;
};

export type GetAllProductCategoriesProps = {
  responseDto: ResponseDtoProps;
  productCategoryDtoList: ProductCategoryProps[];
};

export type AddUpdateProductCategoryProps = {
  responseDto: ResponseDtoProps;
  productCategoryDtoList: any;
};

export type CustomerProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: any;
  confirmPassword: any;
  userType: string;
  userName: string;
  phoneNumber: any;
  id: number;
};

export type GetAllCustomersByPage = {
  responseDto: ResponseDtoProps;
  userDto: any;
  userDtoList: CustomerProps[];
};

export interface UploadTransactionResponseProps {
  responseDto: {
    code: string;
    message: string;
  };
  transactionList: any;
  transactionDto: any;
  transaction: any;
}

export interface AllTransactionsProps {
  responseDto: {
    code: string;
    message: string;
  };

  transactionList: {
    currency: string;
    userName: any;
    descriptionCodeList: any;
    reference: string;
    id: number;
    amount: string;
    multipartFile: any;
    imageUrl: string;
    transactionStatus: string;
    descriptionCode: string;
    productDescriptionId: any;
    transactionId: any;
    reasonForRejection: string;
  }[];

  transactionDto: any;
  transaction: any;
}

export interface ReceiptTransaction {
  currency: string;
  userName: string;
  descriptionCode: string;
  reference: string;
  id: number;
  amount: string;
  multipartFile: string;
  imageUrl: string;
  transactionStatus: string;
}

export interface ReceiptResponseProp {
  responseDto: ResponseDto;
  transactionList: ReceiptTransaction[];
  transactionDto: any;
  transaction: any;
}

export interface AdminCookiesProps {
  token: string;
  emailAddress: string;
}

export interface ImgListProps {
  id: number;
  version: number;
  delFlag: string;
  createdOn: string;
  modifiedOn: string;
  imageUrl: string;
}

export interface ProductDescriptionProps {
  id: number;
  amount: number;
  description: string;
  currency: string;
  imageUrl: string;
  productCode: string;
  code: string;
  location: string;
  productCategoryCode: string;
  recent: string;
  multipartFile: string;
  productCodeList: string;
  productSize: string;
  price: number;
  multipartFileList: string;
  imagesList: ImgListProps[];
  landDocs: any;
  landDoc: ImgListProps[];
  percentageDiscount: string;
  videoList: any;
  availableQuantity: any;
}

export type GetAllProductDescriptionProps = {
  responseDto: ResponseDtoProps;
  productDescriptionDtoList: ProductDescriptionProps[];
};

export type StockProps = {
  id: number;
  productDescriptionCode: string;
  dateTimeStock: any;
  quantity: number;
  productDescription: string;
  productType: string;
  productCategoryCode: any;
  stockStatus: boolean;
  stockCode: string;
  productCode: string;
};

export type GetAllStocks = {
  responseDto: ResponseDtoProps;
  stockDtoList: StockProps[];
};

export type AddUpdateDeleteStockProps = {
  responseDto: ResponseDtoProps;
  stockDtoList: null;
};
