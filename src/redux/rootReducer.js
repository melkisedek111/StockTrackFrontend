import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
import expireReducer from "redux-persist-expire";
import customerSlice from "./reducer/customer.slice.js";
import cartSlice from "./reducer/cart.slice.js";
import globalSlice from "./reducer/global.slice.js";
import { customerApi } from "./api/customer.api";
import { productApi } from "./api/product.api.js";
import { cartApi } from "./api/cart.api";
import { orderApi } from "./api/order.api.js";

const persistConfig = {
	key: "root",
	storage,
	version: 1,
	transforms: [
		expireReducer("preference", {
			expireSeconds: 86400,
			autoExpire: true,
		}),
	],
};

const persistedCustomerReducer = persistReducer(persistConfig, customerSlice);

export default combineReducers({
	[customerApi.reducerPath]: customerApi.reducer,
	[productApi.reducerPath]: productApi.reducer,
	[cartApi.reducerPath]: cartApi.reducer,
	[orderApi.reducerPath]: orderApi.reducer,
	customer: persistedCustomerReducer,
	global: globalSlice,
	cart: cartSlice,
});
