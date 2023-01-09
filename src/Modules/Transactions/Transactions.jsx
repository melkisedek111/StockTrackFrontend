import React, { useState, useEffect } from "react";
import moment from "moment";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, Chip, Container, Grid } from "@mui/material";
import {
	useGetAllOrdersQuery,
	useUpdateOrderMutation,
} from "../../redux/api/order.api";
import currencyFormatter from "currency-formatter";
import {
	OrderChipStatus,
	OrderChipStatusColor,
} from "../../config/app.constants";

function createData(name, calories, fat, carbs, protein, price) {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
		price,
		history: [
			{
				date: "2020-01-05",
				customerId: "11091700",
				amount: 3,
			},
			{
				date: "2020-01-02",
				customerId: "Anonymous",
				amount: 1,
			},
		],
	};
}

function Row(props) {
	const { row, handleUpdateOrder } = props;
	const [open, setOpen] = useState(false);
    const updateOrder = (orderStatus) => {
        if(row.orderStatus === 3){
            return;
        }

        handleUpdateOrder({orderId: row.id, orderStatus});
    }
	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.orderId}
				</TableCell>
				<TableCell align="right">{row.fullName}</TableCell>
				<TableCell align="right">{row.totalQuantity}</TableCell>
				<TableCell align="right">
					{currencyFormatter.format(row.totalPrice, {
						code: "PHP",
					})}
				</TableCell>
				<TableCell align="right">
					{moment(row.createdAt).format("LLL")}
				</TableCell>
				<TableCell align="right">
					<Chip
						label={OrderChipStatus[row.orderStatus]}
						color={OrderChipStatusColor[row.orderStatus]}
					/>
				</TableCell>
				<TableCell align="right" style={{ display: "flex", gap: "5px" }}>
					<Button variant="contained" size="small" color="error" onClick={() => updateOrder(3)} disabled={row.orderStatus === 3 ? true : false}>
						Cancel
					</Button>
					<Button variant="contained" size="small" onClick={() => updateOrder(1)} disabled={row.orderStatus === 3 ? true : false}>
						Shipped
					</Button>
					<Button variant="contained" size="small" onClick={() => updateOrder(2)}>
						Delivered
					</Button>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								Cart Details
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Image</TableCell>
										<TableCell>Product Name</TableCell>
										<TableCell>Brand</TableCell>
										<TableCell>Price</TableCell>
										<TableCell>Quantity</TableCell>
										<TableCell>Total price ($)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.cartDetails.map((cart) => (
										<TableRow key={cart.cartId}>
											<TableCell component="th" scope="row">
												<img
													src={cart.imageUrl}
													style={{ height: 100, objectFit: "contain" }}
												/>
											</TableCell>
											<TableCell>{cart.productName}</TableCell>
											<TableCell>{cart.brand}</TableCell>
											<TableCell>
												{currencyFormatter.format(cart.price, {
													code: "PHP",
												})}
											</TableCell>
											<TableCell>{cart.quantity}</TableCell>
											<TableCell>
												{currencyFormatter.format(cart.productQuantityPrice, {
													code: "PHP",
												})}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
	createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
	createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
	createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

export default function Transactions() {
	const [updateOrder, updateOrderResponse] = useUpdateOrderMutation();
	const getAllOrders = useGetAllOrdersQuery({
		pollingInterval: 3000,
		refetchOnMountOrArgChange: true,
		skip: false,
	});
	const [orders, setOrders] = useState([]);

	const handleUpdateOrder = (props) => updateOrder(props);

	useEffect(() => {
		if (getAllOrders?.data) {
			const { Data } = getAllOrders.data;
			setOrders(Data);
		}
	}, [getAllOrders]);

	return (
		<Container maxWidth="xl">
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					margin: "10px 0",
				}}
			>
				<Typography variant="h4">Transactions</Typography>
			</Box>
			<Grid container>
				<Grid xs={12}>
					<TableContainer component={Paper}>
						<Table aria-label="collapsible table">
							<TableHead>
								<TableRow>
									<TableCell />
									<TableCell style={{ fontWeight: "bold" }}>Order ID</TableCell>
									<TableCell align="right" style={{ fontWeight: "bold" }}>
										Full Name
									</TableCell>
									<TableCell align="right" style={{ fontWeight: "bold" }}>
										Quantity
									</TableCell>
									<TableCell align="right" style={{ fontWeight: "bold" }}>
										Total
									</TableCell>
									<TableCell align="right" style={{ fontWeight: "bold" }}>
										Date Ordered
									</TableCell>
									<TableCell align="right" style={{ fontWeight: "bold" }}>
										Status
									</TableCell>
									<TableCell align="right" style={{ fontWeight: "bold" }}>
										Actions
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders.map((row) => (
									<Row key={row.name} row={row} handleUpdateOrder={handleUpdateOrder} />
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Container>
	);
}
