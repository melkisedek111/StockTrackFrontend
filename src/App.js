import React, { useRef, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import AppNavbar from "./Modules/AppNavbar/AppNavbar.jsx";
import DataTable from "./Modules/DataTable/DataTable.jsx";
import Inventory from "./Modules/Inventory/Inventory.jsx";
import Signin from "./Modules/Signin/Signin.jsx";
import Navbar from "./Modules/Navbar/Navbar.jsx";
import Signup from "./Modules/Signup/Signup.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import CustomAlert from "./Modules/Customs/CustomAlert.jsx";
import Products from "./Modules/Products/Products.jsx";
import RequireAuth from "./Modules/RequireAuth/RequireAuth.jsx";
import Cart from "./Modules/Cart/Cart.jsx";
import Restricted from "./Modules/RequireAuth/Restricted.jsx";
import Order from "./Modules/Order/Order.jsx";
import Customers from "./Modules/Customers/Customers.jsx";
import Transactions from "./Modules/Transactions/Transactions.jsx";

const theme = createTheme({
	typography: {
		fontFamily: ["Roboto Condensed"].join(","),
	},
});

const App = () => {
	const customer = useSelector((state) => state.customer);
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route exact path="/" element={<Products />} />
					<Route
						element={
							<RequireAuth
								role={customer.customer?.role}
								allowedRoles={[1, 0]}
							/>
						}
					>
						<Route exact path="/cart" element={<Cart />} />
						<Route exact path="/orders" element={<Order />} />
					</Route>
					<Route element={<Restricted role={customer.customer?.role} />}>
						<Route exact path="/signin" element={<Signin />} />
						<Route exact path="/signup" element={<Signup />} />
					</Route>
					<Route path="*" element={<Products />} />
				</Route>
				<Route
					element={
						<RequireAuth role={customer.customer?.role} allowedRoles={[0]} />
					}
				>
					<Route exact path="/admin" element={<AppNavbar />}>
						<Route exact path="/admin/inventory" element={<Inventory />} />
						<Route exact path="/admin/customers" element={<Customers />} />
						<Route
							exact
							path="/admin/transactions"
							element={<Transactions />}
						/>
					</Route>
					<Route path="*" element={<Products />} />
				</Route>
			</Routes>
			<CustomAlert />
		</ThemeProvider>
	);
};

export default App;
