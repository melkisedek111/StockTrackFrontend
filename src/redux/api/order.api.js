import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryErrHandler } from "../../utils/rtk.utils";

export const orderApi = createApi({
	reducerPath: "orderApi",
	baseQuery: baseQueryErrHandler,
	tagType: ["Order"],
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: (payload) => ({
				url: "Order/GetOrders",
				method: "POST",
				body: payload
			}),
			providesTags: ['Order'],
		}),
		testAzure: builder.mutation({
			query: (payload) => ({
				url: "Order/TestAzure",
				method: "POST",
				body: payload,
			}),
			async onQueryStarted(id, { dispatch, queryFulfilled }) {},
		}),
		getAllOrders: builder.query({
			query: () => ({
				url: "Order/GetAllOrders",
				method: "POST",
			}),
			providesTags: ['Order'],
		}),
		updateOrder: builder.mutation({
			query: (payload) => ({
				url: "Order/UpdateOrder",
				method: "POST",
				body: payload,
			}),
			invalidatesTags : ["Order"],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {},
		}),
	}),
});

export const { useGetOrdersQuery, useTestAzureMutation, useGetAllOrdersQuery, useUpdateOrderMutation } = orderApi;
