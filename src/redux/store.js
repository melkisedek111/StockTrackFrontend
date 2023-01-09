import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import {
	persistStore,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import { cartApi } from "./api/cart.api.js";
import { customerApi } from "./api/customer.api.js";
import { orderApi } from "./api/order.api.js";
import { productApi } from "./api/product.api.js";
import RootReducer from "./rootReducer.js";

const logger = createLogger();

const middlewares = [customerApi.middleware, productApi.middleware, cartApi.middleware, orderApi.middleware];

if (process.env.NODE_ENV === "development") {
	middlewares.push(logger);
}


export const store = configureStore({
	reducer: RootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(middlewares),
});

export const persistor = persistStore(store);

export const purgePersistor = () => {
	window.localStorage.clear();
	persistor.purge();
}
