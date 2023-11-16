import { AxiosError } from "axios";
import { dker } from "./Links";
import { ResponseDtoProps } from "@/types";
import clearCookies from "./clearCookies";

const HttpErrorHandler = (error: AxiosError) => {
  if (error === null)
    return "Error cannot be recovered, try to repeat this process again";

  const response = error?.response;
  if (response) {
    if (typeof response === "undefined") {
      return "Oops Sorry Please try again in few mins.";
    }
    const dkResponse: any = response?.data;
    const responseDto: ResponseDtoProps = dkResponse.responseDto;
    if (responseDto.code === dker) {
      return responseDto.message;
    }
    const statusCode = response?.status;
    if (statusCode === 404) {
      return "The requested resource does not exist or has been deleted";
    } else if (statusCode === 401) {
      localStorage.clear();
      clearCookies();
      window.location.href = "/";
      return "Please login to access this resource";
    } else if (statusCode === 500 || statusCode === 405) {
      return "Our Enginners are currently working on it, please try again in few minutes";
    } else if (statusCode === 403) {
      return "Your session has expired you need to login again.";
    }
  } else if (error.code === "ERR_NETWORK") {
    return "There was a connection problem..";
  } else if (error.code === "ERR_CANCELED") {
    return "The connection was canceled..";
  }
  return error.message;
};

export default HttpErrorHandler;
