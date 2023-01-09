import React from "react";
import {
	Box,
	Card,
	CardContent,
	Chip,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import currencyFormatter from "currency-formatter";
import moment from "moment";
import { OrderChipStatus, OrderChipStatusColor } from "../../../config/app.constants";

const OrderCard = ({ item }) => {
	const { id, items, orderId, orderStatus, orderedDate, totalPrice } = item;

	return (
		<Card>
			<CardContent>
				<Box style={{ display: "flex", justifyContent: "space-between" }}>
					<Box style={{ display: "flex", alignItems: "center", gap: "15px" }}>
						<Typography variant="h5">
							Total Amount:{" "}
							<span style={{fontWeight: "bold"}}>
								{currencyFormatter.format(totalPrice, {
									code: "PHP",
								})}
							</span>
						</Typography>
						<Typography variant="body2">
							Ordered by {moment(orderedDate).format("LLL")}
						</Typography>
					</Box>
					<Chip label={OrderChipStatus[orderStatus]} color={OrderChipStatusColor[orderStatus]} />
				</Box>
				<Divider style={{ margin: "15px" }} />
				<Grid container spacing={1}>
					{items.map((item) => (
						<Grid key={item.cartId} item xs={12}>
							<Box
								style={{
									display: "grid",
									gridTemplateColumns: ".5fr 1.5fr 1fr 1.5fr",
									placeItems: "center",
									alignItems: "center",
								}}
							>
								<img
									style={{ height: 150, objectFit: "contain" }}
									src={item.imageUrl}
								/>
								<Typography variant="h6">{item.name}</Typography>
								<Typography variant="body1">
									{currencyFormatter.format(item.price, {
										code: "PHP",
									})}
								</Typography>
								<Typography variant="body1">
									Qty: {item.totalQuantity}
								</Typography>
							</Box>
						</Grid>
					))}
				</Grid>
			</CardContent>
		</Card>
	);
};

export default OrderCard;
