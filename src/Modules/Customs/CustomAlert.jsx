import React, { useEffect, useState } from "react";
import {
	Alert,
	Backdrop,
	CircularProgress,
	Slide,
	Snackbar,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { AlertConstant } from "../../config/app.constants";

const CustomAlert = () => {
	const global = useSelector((state) => state.global);
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("success");
	const [openBackdrop, setOpenBackdrop] = useState(false);
	const [transition, setTransition] = useState(undefined);

	const handleClose = () => {
		setOpen(false);
	};
	const TransitionDown = (props) => {
		return <Slide {...props} direction="down" />;
	};

	useEffect(() => {
		setOpenBackdrop(global.isLoading);

		if (global.message) {
			setTransition(() => TransitionDown);
			setOpen(true);
			setMessage(global.message);
			if (global.code) {
				setSeverity(AlertConstant[global.code]);
			}
		}
	}, [global]);

	return (
		<div>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
			<Backdrop sx={{ color: "#fff", zIndex: 12000 }} open={openBackdrop}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
};

export default CustomAlert;
