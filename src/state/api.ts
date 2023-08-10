import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "./types";

// Create an API client using createApi
export const api = createApi({
  // Define the base query function using fetchBaseQuery
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),

  // Specify a unique string identifier for this slice of state
  reducerPath: "main",

  // Define custom tag types for invalidating cached data
  tagTypes: ["Kpis", "Products", "Transactions"],

  // Define the endpoints for making API requests
  endpoints: (build) => ({
    // Define an endpoint named "getKpis"
    getKpis: build.query<Array<GetKpisResponse>, void>({
      // Define the query function for this endpoint
      query: () => "kpi/kpis/",

      // Define tags for invalidating cached data
      providesTags: ["Kpis"],
    }),

    // Define an endpoint named "getProducts"
    getProducts: build.query<Array<GetProductsResponse>, void>({
      // Define the query function for this endpoint
      query: () => "product/products/",

      // Define tags for invalidating cached data
      providesTags: ["Products"],
    }),
    // Define an endpoint named "getProducts"
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({
      // Define the query function for this endpoint
      query: () => "transaction/transactions/",

      // Define tags for invalidating cached data
      providesTags: ["Transactions"],
    }),
  }),
});

// Export hooks to use the defined API endpoints
export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
  api;
