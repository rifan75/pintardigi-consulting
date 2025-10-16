import { baseAxios, fetchBaseAxios } from "./axiosFunction";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseAxios({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  }),
  endpoints: () => ({}),
});

export const fetchBaseApi = fetchBaseAxios({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string,
});
