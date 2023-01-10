import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryErrHandler } from "../../utils/rtk.utils";

export const productApi = createApi({
	reducerPath: "productApi",
	baseQuery: baseQueryErrHandler,
	tagType: ["Product"],
	endpoints: (builder) => ({
		addNewProduct: builder.mutation({
			query: (payload) => ({
				url: "Product/AddNewProduct",
				method: "POST",
				body: payload,
			}),
			invalidatesTags : ["Product"],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {
				// try {
				// 	const { data } = await queryFulfilled;
				// 	console.log({ data });
				// } catch (error) {}
			},
		}),
		getProducts: builder.query({
			query: () => ({
				url: "Product/GetProducts",
				method: "POST"
			}),
			providesTags: ['Product'],
		}),
		addQuantity: builder.mutation({
			query: (payload) => ({
				url: "Product/addQuantity",
				method: "POST",
				body: payload,
			}),
			invalidatesTags : ["Product"],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {},
		}),
	}),
});

export const { useAddNewProductMutation, useGetProductsQuery, useAddQuantityMutation } = productApi;
