import {
	Box,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/order.api.js";
import OrderCard from "./Components/OrderCard.jsx";

const Order = () => {
	const customerData = useSelector((state) => state.customer);
	const getOrders = useGetOrdersQuery({
		customerId: customerData.customer.user_id,
	});
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (getOrders?.data) {
			const { Data } = getOrders.data;
			setOrders(Data);
		}
	}, [getOrders]);
	return (
		<Container maxWidth="lg" sx={{ padding: "30px 0" }}>
			<Typography variant="h4" fontWeight="bold">
				My Orders
			</Typography>
			{getOrders?.isLoading ? (
				<Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
					<CircularProgress />
				</Box>
			) : orders.length ? (
				<Grid container spacing={2}>
					{orders.map((order, index) => (
						<Grid key={index} item xs={12}>
							<OrderCard item={order} />
						</Grid>
					))}
				</Grid>
			) : (
				<Typography variant="h5" sx={{ textAlign: "center", color: "#838383" }}>
					There are no orders available. <Link to="/">Click here to shop</Link>
				</Typography>
			)}
		</Container>
	);
};

export default Order;
