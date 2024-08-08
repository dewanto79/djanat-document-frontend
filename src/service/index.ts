import { localStorageMixins } from "@/utils/localStorage.mixins";
import axios from "axios";

// import { baseUrl } from './constants';

const qs = require("qs");

const apiClient = axios.create({
  timeout: 200000,
  baseURL: "/",
  headers: {
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

apiClient.interceptors.request.use;

apiClient.interceptors.request.use(
  async (config: any) => {
    const token = JSON.parse(localStorageMixins.get("access_token") as string);
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (resp) => {
    return resp.data;
  },
  (error) => {
    // In case of status 401 user will redirect to login page because of token expire
    if (error?.response?.status === 401) {
      // window.location.href = "/login";
      localStorageMixins.remove("access_token");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
