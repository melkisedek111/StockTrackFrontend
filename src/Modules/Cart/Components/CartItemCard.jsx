import React, { useEffect, useState } from "react";
import {
	Avatar,
	Box,
	Card,
	CardContent,
	IconButton,
	TextField,
	Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import currencyFormatter from "currency-formatter";
import { useUpdateCartQuantityMutation } from "../../../redux/api/cart.api";

const CartItemCard = ({ product, customerId }) => {
	const [updateCartQuantity, updateCartQuantityResponse] =
		useUpdateCartQuantityMutation();
	const {
		name,
		brand,
		feature,
		imageUrl,
		totalQuantity,
		price,
		productId,
		cartId,
	} = product;
	const [quantity, setQuantity] = useState(0);

	const handleUpdateCartQuantity = (process) => {
		updateCartQuantity({
			customerId,
			productId,
			cartId,
			processOperation: process,
		});
	};

	useEffect(() => {
		setQuantity(totalQuantity);
	}, [totalQuantity]);

	useEffect(() => {}, [updateCartQuantityResponse]);

	return (
		<Card sx={{ width: "100%" }}>
			<CardContent
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
					alignItems: "center",
					placeItems: "center",
				}}
			>
				<img style={{ height: 150, objectFit: "contain" }} src={imageUrl} />
				<Box>
					<Typography variant="h4">{name}</Typography>
					<Typography variant="body2">{feature}</Typography>
				</Box>
				<Box>
					<Typography variant="h5">{brand}</Typography>
					<Typography variant="body2">Brand</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: "10px", alingItems: "center" }}>
					<IconButton onClick={() => handleUpdateCartQuantity("add")}>
						<AddCircleIcon />
					</IconButton>
					<TextField disabled value={quantity} sx={{ width: "40px" }} />
					<IconButton onClick={() => handleUpdateCartQuantity("deduct")}>
						<RemoveCircleIcon />
					</IconButton>
				</Box>
				<Typography variant="h5">
					{currencyFormatter.format(price, { code: "PHP" })}
					<Typography variant="body2">Price</Typography>
				</Typography>
			</CardContent>
		</Card>
	);
};

export default CartItemCard;
