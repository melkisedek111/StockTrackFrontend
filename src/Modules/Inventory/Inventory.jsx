import {
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	Stack,
	TableCell,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/product.api.js";
import CustomModal from "../CustomModal/CustomModal.jsx";
import DataTable from "../DataTable/DataTable.jsx";
import ProductForm from "./Components/ProductForm.jsx";
import AddIcon from "@mui/icons-material/Add";
import { useTestAzureMutation } from "../../redux/api/order.api.js";

const Inventory = () => {
	const [products, setProducts] = useState([]);
	const getProducts = useGetProductsQuery({
		pollingInterval: 3000,
		refetchOnMountOrArgChange: true,
		skip: false,
	});

	const [openModal, setOpenModal] = useState(false);
	const handleCloseModal = () => setOpenModal(false);
	const columns = [
		{ id: "name", label: "Name", minWidth: 170 },
		{ id: "imageUrl", label: "Image", minWidth: 200 },
		{ id: "feature", label: "Feature", minWidth: 100 },
		{ id: "price", label: "Price", minWidth: 100 },
		{ id: "quantity", label: "Quantity", minWidth: 100 },
		{ id: "category", label: "Category", minWidth: 100 },
		{ id: "actions", label: "Actions", minWidth: 100, align: "center" },
	];

	const TableCells = {
		name: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				{column.format && typeof value === "number"
					? column.format(value)
					: value}
			</TableCell>
		),
		imageUrl: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				<img src={value} style={{ height: 120, objectFit: "contain" }} />
			</TableCell>
		),
		feature: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				{column.format && typeof value === "number"
					? column.format(value)
					: value}
			</TableCell>
		),
		price: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				{column.format && typeof value === "number"
					? column.format(value)
					: value}
			</TableCell>
		),
		quantity: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				{column.format && typeof value === "number"
					? column.format(value)
					: value}
			</TableCell>
		),
		category: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				{column.format && typeof value === "number"
					? column.format(value)
					: value}
			</TableCell>
		),
		actions: (column, value) => (
			<TableCell key={column.id} align={column.align}>
				<Stack
					direction="row"
					spacing={1}
					alignItems="center"
					justifyContent="center"
				>
					<IconButton color="primary" aria-label="delete">
						<AddIcon />
					</IconButton>
				</Stack>
			</TableCell>
		),
	};

	useEffect(() => {
		if (getProducts?.data) {
			const { Data } = getProducts.data;
			setProducts(Data);
		}
	}, [getProducts]);

	return (
		<Container maxWidth="xl">
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					margin: "10px 0",
				}}
			>
				<Typography variant="h4">Inventory</Typography>
				<Button variant="contained" onClick={() => setOpenModal(true)}>
					Add New Product
				</Button>
			</Box>
			<Grid container>
				<Grid xs={12}>
					<DataTable
						columns={columns}
						rows={products}
						TableCells={TableCells}
					/>
				</Grid>
			</Grid>
			<CustomModal
				modalSize="sm"
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				headerName="New Product"
				handleSubmit={() => {}}
			>
				<ProductForm closeModal={handleCloseModal} />
			</CustomModal>
		</Container>
	);
};

export default Inventory;
