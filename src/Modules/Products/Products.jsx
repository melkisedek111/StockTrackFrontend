import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Container, Grid, Typography } from "@mui/material";
import ProductCard from "./Components/ProductCard.jsx";
import { useGetProductsQuery } from "../../redux/api/product.api.js";

const Products = () => {
	const getProducts = useGetProductsQuery();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		if (getProducts?.data) {
			const { Data } = getProducts.data;
			setProducts(Data);
		}
	}, [getProducts]);

	return (
		<Container maxWidth="lg" sx={{ padding: "30px 0" }}>
			<Typography variant="h4" marginBottom="15px" fontWeight="bold">
				Products
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: "20px",
					justifyContent: "space-between",
				}}
			>
				{getProducts?.isLoading ? (
					<Box sx={{ display: "inline-block", margin: "0 auto" }}>
						<CircularProgress />
					</Box>
				) : (
					products?.map((product, index) => (
						<ProductCard key={index} product={product} />
					))
				)}
			</Box>
			{/* <Grid container>
				<Grid item xs={12} md={4}>
					<ProductCard />
				</Grid>
				<Grid item xs={12} md={4}>
					<ProductCard />
				</Grid>
				<Grid item xs={12} md={4}>
					<ProductCard />
				</Grid>
				<Grid item xs={12} md={4}>
					<ProductCard />
				</Grid>
				<Grid item xs={12} md={4}>
					<ProductCard />
				</Grid>
				<Grid item xs={12} md={4}>
					<ProductCard />
				</Grid>
				<Grid item xs={12} md={4}>
					<ProductCard />
				</Grid>
			</Grid> */}
		</Container>
	);
};

export default Products;
