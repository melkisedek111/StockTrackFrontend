import React from "react";
import { Box, Button, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../../../redux/reducer/cart.slice.js";
import { useAddItemToCartMutation } from "../../../redux/api/cart.api.js";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const TypographyMargin = "8px";
const ProductCard = ({ product }) => {
	const [addItemToCartRequest, addItemToCartResponse] =
		useAddItemToCartMutation();
	const { name, imageUrl, feature, brand, price, quantity, category } = product;
	const customerData = useSelector((state) => state.customer);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		if (!customerData?.customer?.user_id) {
			navigate("/signin");
			return;
		}
		addItemToCartRequest({
			productId: product.id,
			customerId: customerData?.customer.user_id,
			TotalQuantity: 1,
		});
	};

	return (
		<Box
			sx={{
				border: "solid 1px #e1e1e1",
				borderRadius: "10px",
				width: "350px",
				overflow: "hidden",
				position: "relative",
				filter: `grayscale(${quantity ? 0 : 100}%)`,
			}}
		>
			{!quantity ? (
				<Box
					sx={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<Typography variant="h4">OUT OF STOCK</Typography>
				</Box>
			) : null}

			<Box
				sx={{
					height: "450px",
					width: "inherit",
					overflow: "hidden",
				}}
			>
				<img
					src={imageUrl}
					style={{ objectFit: "contain", width: "inherit" }}
				/>
			</Box>
			<Box sx={{ padding: "25px" }}>
				<Typography variant="h6">₱{price}</Typography>
				<Typography variant="button" sx={{ margin: "0" }}>
					{brand}
				</Typography>
				<Typography
					variant="h5"
					sx={{ fontWeight: "bold", marginBottom: TypographyMargin }}
				>
					{name}
				</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						svg: {
							fontSize: "12px",
						},
						span: {
							fontSize: "12px",
						},
						marginBottom: TypographyMargin,
					}}
				>
					<StarIcon />
					<StarIcon />
					<StarIcon />
					<StarIcon />
					<span>(4)</span>
				</Box>
				<Typography
					variant="body2"
					sx={{
						color: "#646464",
						marginBottom: "12px",
						fontWeight: "lighter",
					}}
				>
					{feature}
				</Typography>
				{!quantity ? (
					<Button
						size="large"
						fullWidth
						variant="outlined"
						endIcon={<RemoveShoppingCartIcon />}
						sx={{ marginBottom: TypographyMargin }}
					>
						Out of Stock
					</Button>
				) : (
					<Button
						size="large"
						fullWidth
						variant="outlined"
						endIcon={<AddShoppingCartIcon />}
						sx={{ marginBottom: TypographyMargin }}
						onClick={handleAddToCart}
					>
						Add to Cart
					</Button>
				)}
				<Typography variant="caption" display="block" gutterBottom>
					Choose a store to see local availability
				</Typography>
			</Box>
		</Box>
	);
};

export default ProductCard;
