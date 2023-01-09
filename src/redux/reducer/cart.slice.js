import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "customer",
	initialState: {
		items: [],
		total: 0,
	},
	reducers: {
		addItemToCart: (state, action) => {
			const { product } = action.payload;
			const selectedProduct = state.items.find(
				(item) => item.id === product.id
			);

			if (selectedProduct) {
				const cartItems = [...state.items];
				state.items = cartItems.map((item) => {
					if (item.id === selectedProduct.id) {
						item.quantity += 1;
					}
					return item;
				});
			} else {
				state.items.push({
					id: product.id,
					quantity: 1,
					price: product.price,
				});
			}

			state.total = state.items.reduce(
				(accumulator, currentValue) =>
					(accumulator += currentValue.price * currentValue.quantity),
				0
			);
		},
	},
});

export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;
