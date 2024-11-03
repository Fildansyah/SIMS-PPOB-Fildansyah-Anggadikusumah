import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.BASE_URL;

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    topup: builder.mutation({
      query: (data) => ({
        url: "/topup",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    transaction: builder.mutation({
      query: (data) => ({
        url: "/transaction",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    transactionHistory: builder.query({
      query: (params) => ({
        url: "/transaction/history",
        method: "GET",
        params: params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useTopupMutation,
  useTransactionMutation,
  useTransactionHistoryQuery,
} = transactionApi;
