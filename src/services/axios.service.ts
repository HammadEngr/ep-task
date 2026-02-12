import axios from "axios";
import { ACCESS_TOKEN_LOCAL_STORAGE } from "../constants/common";
import { Navigate } from "react-router";

const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    if (error.status === 401 || error.response.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE);
      Navigate({ to: "/" });
      return;
    }
    return Promise.reject(error);
  },
);

export const getApi = (url: string) => {
  return http.get(url).then((res) => res.data);
};

export const postApi = async (url: string, data: any) => {
  return http.post(url, data).then((res) => {
    console.log(res);
    return res.data;
  });
};

export const putApi = (url: string, data: any) => {
  return http.put(url, data).then((res) => res.data);
};
