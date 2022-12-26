import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mtrt-ssr.vercel.app/",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // get all products
    getProducts: builder.query({
      query: () => "products",
      providesTags: ["Product"],
    }),

    // post a product
    postProduct: builder.mutation({
      query: (data) => ({
        url: "product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  usePostProductMutation,
  useDeleteProductMutation,
} = productApi;
