import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIConstant } from "../../config/app.constants";
import { baseQueryErrHandler } from "../../utils/rtk.utils";

export const customerApi = createApi({
	reducerPath: "customerApi",
	baseQuery: baseQueryErrHandler,
	tagType: ["Customer", "Auth"],
	endpoints: (builder) => ({
		addNewCustomer: builder.mutation({
			query: (payload) => ({
				url: "Customer/AddNewCustomer",
				method: "POST",
				body: payload,
			}),
			invalidatesTags : ["Customer"],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {},
		}),
		signinCustomer: builder.mutation({
			query: (payload) => ({
				url: "Auth/AuthLogin",
				method: "POST",
				body: payload,
			}),
			invalidatesTags : ["Auth"],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {},
		}),
		getAllCustomers: builder.query({
			query: () => ({
				url: "Customer/GetAllCustomers",
				method: "POST"
			}),
			providesTags: ['Customer'],
		}),
	}),
});

export const { useAddNewCustomerMutation, useSigninCustomerMutation, useGetAllCustomersQuery } = customerApi;
