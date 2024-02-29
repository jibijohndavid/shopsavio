import axios, { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

type ResponseEnvelope = {
  success: boolean;
  data: any;
  error?: any;
  message: string;
  token?: string;
};

type ModifiedAxiosResponse = Promise<AxiosResponse<ResponseEnvelope>>;

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const TOKEN = "token";
export const ROLE = "role";
export const REFRESH_TOKEN = "refreshtoken";

export const axiosClient = axios.create();
axiosClient.defaults.baseURL = baseURL;

let userToken = "";
if (typeof window !== "undefined") {
  userToken = localStorage.getItem(TOKEN) || "";
}

axiosClient.defaults.headers.common = {
  Authorization: `Bearer ${userToken}`,
};

axiosClient.interceptors.response.use(
  function (response) {
    //Dispatch any action on success
    return response;
  },

  function (error) {
    if (error.response.status === 401) {
      toast.error("Token is Invalid or Expired.");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.replace(window.location.origin + "/login");

      return Promise.reject(error);
    }
  }
);

export function getRequest(URL: string): ModifiedAxiosResponse {
  return axiosClient.get(`/${URL}`).then((response) => response);
}

export function postRequest(
  URL: string,
  payload?: Record<string, any>
): ModifiedAxiosResponse {
  return axiosClient.post(`/${URL}`, payload).then((response) => response);
}

export function putRequest(
  URL: string,
  payload: Record<string, any>
): ModifiedAxiosResponse {
  return axiosClient.put(`/${URL}`, payload).then((response) => response);
}

export function patchRequest(
  URL: string,
  payload: Record<string, any>
): ModifiedAxiosResponse {
  return axiosClient.patch(`/${URL}`, payload).then((response) => response);
}

export function deleteRequest(URL: string): ModifiedAxiosResponse {
  return axiosClient.delete(`/${URL}`).then((response) => response);
}
