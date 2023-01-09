import React from "react";
import Button from "@mui/material/Button";
import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";

const CustomModal = ({
	openModal,
	handleCloseModal,
	headerName,
	handleSubmit,
	children,
	modalSize,
}) => {
	return (
		<div>
			<Dialog
				open={openModal}
				onClose={handleCloseModal}
				scroll={"body"}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
				fullWidth
				maxWidth={modalSize || "md"}
			>
				<DialogTitle
					sx={{ backgroundColor: "#1976d2", color: "#FFF" }}
					id="scroll-dialog-title"
				>
					{headerName}
				</DialogTitle>
				<DialogContent dividers style={{ margin: "0" }}>
					{children}
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CustomModal;
