import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
	name: "global",
	initialState: {
		message: "",
		code: 0,
		isLoading: false,
	},
	reducers: {
		resetLoadingState: (state, action) => {
			state.isLoading = false;
			state.message = "";
			state.code = 0;
		},
		globalActionLoad: (state, action) => {
			state.isLoading = action.payload?.isLoading;
			state.message = action.payload?.Message;
			state.code = action.payload?.Code;
		},
		setResponseState: (state, action) => {
			if (action.payload?.Code) {
				state.message = action.payload?.Message;
				state.code = action.payload?.Code;
				state.isLoading = false;
			}
		},
		apiRequestState: (state, action) => {
			state.message = "";
			state.code = 0;
			state.isLoading = true;
		},
	},
});

export const { setResponseState, apiRequestState, globalActionLoad, resetLoadingState } =
	globalSlice.actions;
export default globalSlice.reducer;
