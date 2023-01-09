import {
	Box,
	Container,
	Grid,
	Stack,
	TableCell,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetAllCustomersQuery } from "../../redux/api/customer.api.js";
import DataTable from "../DataTable/DataTable.jsx";

const Customers = () => {
	const getAllCustomers = useGetAllCustomersQuery();
	const [customer, setCustomers] = useState([]);
	const columns = [
		{ id: "fullName", label: "Full Name", minWidth: 170 },
		{ id: "username", label: "Username", minWidth: 200 },
		{ id: "role", label: "Role", minWidth: 120 },
		{ id: "actions", label: "Actions", minWidth: 100, align: "center" },
	];

	const TableCells = {
		fullName: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				{column.format && typeof value === "number"
					? column.format(value)
					: value}
			</TableCell>
		),
		username: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				{column.format && typeof value === "number"
					? column.format(value)
					: value}
			</TableCell>
		),
		role: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				{ value == 1 ? "Customer" : "Admin"}
			</TableCell>
		),
		actions: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
					justifyContent="center"
				></Stack>
			</TableCell>
		),
	};

	useEffect(() => {
		if (getAllCustomers?.data) {
			const { Data } = getAllCustomers.data;
			setCustomers(Data);
		}
	}, [getAllCustomers]);

	return (
		<Container maxWidth="xl">
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					margin: "10px 0",
				}}
			>
				<Typography variant="h4">Customers</Typography>
			</Box>
			<Grid container>
				<Grid xs={12}>
					<DataTable
						columns={columns}
						rows={customer}
						TableCells={TableCells}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Customers;
("");
