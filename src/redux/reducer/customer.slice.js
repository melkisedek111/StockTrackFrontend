import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
	name: "customer",
	initialState: {
		customer: {},
		isLoggedIn: false,
		JWTToken: undefined,
	},
	reducers: {
		getUserState: (state, action) => {
			if (action.payload?.username) {
				state.customer = {
					username: action.payload?.username,
					fullName: action.payload?.fullName,
					user_id: action.payload?.id,
					role: action.payload?.role,
				};
				state.JWTToken = action.payload?.token;
				state.isLoggedIn = true;
			}
		},
		removeUserState: async (state, action) => {
			state.customer = {};
			state.isLoggedIn = false;
			state.JWTToken = undefined;
		},
	},
});

export const { getUserState, removeUserState } = customerSlice.actions;
export default customerSlice.reducer;
