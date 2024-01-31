import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "../auth/api";

// Custom base query function to include headers
const baseQuery = fetchBaseQuery({
  baseUrl: url,
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,

  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page = 1) => `products?pageNumber=${page}`,
    }),
    getProductsByCategory: builder.query({
      query: (category, page = 1) =>
        `products/category/${category}?pageNumber=${page}`,
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
    }),
    getSingleProduct: builder.query({
      query: (id) => `products/${id}`,

      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
    }),
    searchProducts: builder.query({
      // Add parameters as needed for search (e.g., query, category, brand)
      query: ({ query, category, brand }) =>
        `products?search=${query}&category=${category}&brand=${brand}`,
    }),
    sortProducts: builder.query({
      // Add parameters as needed for sorting (e.g., sortBy, sortOrder)
      query: ({ sortBy, sortOrder }) =>
        `products?sortBy=${sortBy}&sortOrder=${sortOrder}`,
    }),
    filterProductsByBrand: builder.query({
      // Add parameters as needed for filtering (e.g., brand)
      query: (brand) => `products?brand=${brand}`,
    }),
    filterProductsByCategory: builder.query({
      // Add parameters as needed for filtering (e.g., category)
      query: (category) => `products?category=${category}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetSingleProductQuery,
  useSearchProductsQuery,
  useSortProductsQuery,
  useFilterProductsByBrandQuery,
  useFilterProductsByCategoryQuery,
} = productsApi;
