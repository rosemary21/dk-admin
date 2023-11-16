import Cookies from "js-cookie";

export const dkss = "dkss";
export const dker = "dker";
export const adminUser = "adminUser";
export const adminToken = "adminToken";

export const getToken = () => {
  return Cookies.get("adminToken") as string;
};

export const getUserName = () => {
  return Cookies.get("adminUser") as string;
};

export const LINKS = {
  dashboardLogin: "/",
  dashboardHome: "/dashboardHome",
  dashboardProduct: "/dashboardProduct",
  dashboardProductCategory: "/dashboardProductCategory",
  dashboardProductDescription: "/dashboardProductDescription",
  dashboardSettings: "/dashboardSettings",
  dashboardReceipt: "/dashboardReceipt",
  dashboardCustomer: "/dashboardCustomer",
  dashboardStock: "/dashboardStock",
  dashboardOrders: "/dashboardOrders",
};
