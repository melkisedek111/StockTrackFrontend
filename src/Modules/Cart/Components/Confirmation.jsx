import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const Confirmation = () => {
	return (
		<Box textAlign="center">
			<Typography variant="h4">Your order has been received</Typography>
			<CheckCircleIcon
				style={{ fontSize: 120, margin: "20px 0" }}
				color="success"
			/>
			<Typography variant="h6">Thank you for your purchase!</Typography>
			<Typography variant="body1">Your Order ID is: 120393912</Typography>
			<Link to="/" style={{textDecoration: "none"}}>
				<Button
					size="large"
					variant="contained"
					color="warning"
					fullWidth
					style={{ marginTop: "20px" }}
				>
					Continue Shopping
				</Button>
			</Link>
		</Box>
	);
};

export default Confirmation;
