import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryErrHandler } from "../../utils/rtk.utils";

export const cartApi = createApi({
	reducerPath: "cartApi",
	baseQuery: baseQueryErrHandler,
	tagType: ["Cart"],
	endpoints: (builder) => ({
		addItemToCart: builder.mutation({
			query: (payload) => ({
				url: "Cart/AddItemToCart",
				method: "POST",
				body: payload,
			}),
			invalidatesTags : ["Cart"],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {},
		}),
		getCartItems: builder.query({
			query: (payload) => ({
				url: "Cart/GetCartItems",
				method: "POST",
				body: payload
			}),
			providesTags: ['Cart'],
		}),
		updateCartQuantity: builder.mutation({
			query: (payload) => ({
				url: "Cart/updateCartQuantity",
				method: "POST",
				body: payload,
			}),
			invalidatesTags : ["Cart"],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {},
		}),
		checkoutCartItems: builder.mutation({
			query: (payload) => ({
				url: "Cart/CheckoutCartItems",
				method: "POST",
				body: payload,
			}),
			invalidatesTags : ["Cart"],
			async onQueryStarted(id, { dispatch, queryFulfilled }) {},
		}),
	}),
});

export const { useAddItemToCartMutation, useGetCartItemsQuery, useUpdateCartQuantityMutation, useCheckoutCartItemsMutation } = cartApi;
