import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import currencyFormatter from "currency-formatter";
import { useCheckoutCartItemsMutation, useGetCartItemsQuery } from "../../redux/api/cart.api.js";
import CartItemCard from "./Components/CartItemCard.jsx";
import CustomModal from "../CustomModal/CustomModal.jsx";
import Confirmation from "./Components/Confirmation.jsx";

const Cart = () => {
	const customerData = useSelector((state) => state.customer);
	const getCartItems = useGetCartItemsQuery({ customerId: customerData.customer.user_id});
	const [checkoutCartItems, checkoutCartItemsResponse] = useCheckoutCartItemsMutation();
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [openModal, setOpenModal] = useState(false);
	const handleCloseModal = () => setOpenModal(false);

	const handleCheckout = () => {
		const cartIds = cartItems.map(item => item.cartId);
		checkoutCartItems({customerId: customerData.customer.user_id, cartIds});
	}

	useEffect(() => {
		if (getCartItems?.data) {
			const { Data } = getCartItems.data;
			setCartItems(Data.items);
			setTotalPrice(Data.totalPrice);
		}
	}, [getCartItems]);

	useEffect(() => {
		if(checkoutCartItemsResponse?.isSuccess){
			if(checkoutCartItemsResponse.data?.Status && checkoutCartItemsResponse.data?.Code){
				setOpenModal(true);
			}
		}
	}, [checkoutCartItemsResponse])

	return (
		<Container maxWidth="xl" sx={{ paddingTop: "30px" }}>
			{cartItems.length ? (
				<Grid container spacing={2}>
					<Grid item xs={9}>
						<Typography variant="h4" marginBottom="15px" fontWeight="bold">
							Cart items
						</Typography>

						<>
							{" "}
							<Grid container spacing={2}>
								{cartItems.map((product, index) => (
									<Grid item key={index} xs={12}>
										<CartItemCard
											key={product.productId}
											product={product}
											customerId={customerData.customer.user_id}
										/>
									</Grid>
								))}
							</Grid>
						</>
					</Grid>
					<Grid item xs={3}>
						<Typography variant="h4" marginBottom="15px" fontWeight="bold">
							Cart Details
						</Typography>
						<Card>
							<CardContent>
								{cartItems.map((product, index) => (
									<Grid container spacing={1}>
										<Grid item xs={3}>
											<img
												src={product.imageUrl}
												style={{ height: 80, objectFit: "contain" }}
											/>
										</Grid>
										<Grid item xs={6}>
											<Typography variant="body2" fontWeight={"bold"}>
												{product.name}
											</Typography>
											<Typography variant="caption">
												{currencyFormatter.format(product.price, {
													code: "PHP",
												})}{" "}
												X {product.totalQuantity}
											</Typography>
										</Grid>
										<Grid item xs={3}>
											<Typography variant="body2" fontWeight={"bold"}>
												{currencyFormatter.format(
													product.price * product.totalQuantity,
													{ code: "PHP" }
												)}
											</Typography>
											<Typography variant="caption">Total</Typography>
										</Grid>
									</Grid>
								))}
								<Divider sx={{ margin: "15px 0" }} />
								<Box sx={{ textAlign: "right" }}>
									<Typography variant="h6" style={{ color: "#838383" }}>
										Total
									</Typography>
									<Typography variant="h5">
										{currencyFormatter.format(totalPrice, { code: "PHP" })}
									</Typography>
									<Button
										color="warning"
										variant="contained"
										fullWidth
										style={{ marginTop: "20px" }}
										onClick={handleCheckout}
									>
										Checkout
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			) : (
				<Typography variant="h5" sx={{ textAlign: "center", color: "#838383" }}>
					There are no items in your cart at the moment.{" "}
					<Link to="/">Click here to shop</Link>
				</Typography>
			)}
			<CustomModal
				modalSize="sm"
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				headerName="Confirmation"
				handleSubmit={() => {}}
			>
				<Confirmation />
			</CustomModal>
		</Container>
	);
};

export default Cart;
