import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { axios } from "./axiosCreate";
import { refreshTokenMemApi } from "./refreshTokenMemApi";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { Mutex } from "async-mutex";
import { setMenu } from "@/store/menuSlice";

interface BaseURLProps {
  baseUrl: string;
}

const mutex = new Mutex();
// Pass a callback function to obtain the dispatch function
export const baseAxios =
  (
    { baseUrl }: BaseURLProps = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      headers?: any;
      responseType?: AxiosRequestConfig["responseType"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown,
    unknown
  > =>
  async ({ url, method, data, headers, responseType, params }, api) => {
    await mutex.waitForUnlock();
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        headers,
        responseType,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      console.log("err.response =>", err.response?.status);
      if (err.response?.status === 401) {
        if (!mutex.isLocked()) {
          const release = await mutex.acquire();
          try {
            const response = await refreshTokenMemApi();
            api.dispatch(
              setMenu({
                legal: response.data.menu.legal,
                tax: response.data.menu.tax,
                accounting: response.data.menu.accounting,
              })
            );
            const result = await axios({
              url: baseUrl + url,
              method,
              data,
              headers,
              responseType,
              params,
            });
            return { data: result.data };
          } finally {
            release();
          }
        } else {
          await mutex.waitForUnlock();
          try {
            const result = await axios({
              url: baseUrl + url,
              method,
              data,
              headers,
              responseType,
              params,
            });
            return { data: result.data };
          } catch (error) {
            return {
              error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
              },
            };
          }
        }
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const fetchBaseAxios =
  (
    { baseUrl }: BaseURLProps = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      headers?: any;
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        headers,
        params,
        withCredentials: true,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
