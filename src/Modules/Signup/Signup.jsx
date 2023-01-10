import React, { useEffect, useState } from "react";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
	handleValidation,
	handleFieldChange,
} from "../../helpers/form.helper.jsx";
import { useAddNewCustomerMutation } from "../../redux/api/customer.api.js";
import CustomTextField from "../Customs/CustomTextfield.jsx";
import { globalActionLoad } from "../../redux/reducer/global.slice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserState } from "../../redux/reducer/customer.slice.js";

const Signup = () => {
	const [addNewCustomer, addNewCustomerResponse] = useAddNewCustomerMutation();
	const [errors, setErrors] = useState({});
	const [formFields, setFormFields] = useState({
		fullName: {
			value: "",
			type: "letter|space|dot",
			label: "Full Name",
		},
		username: {
			value: "",
			type: "username",
			label: "Username",
		},
		email: {
			value: "",
			type: "email",
			label: "Email",
		},
		password: {
			value: "",
			type: "password",
			label: "Password",
		},
		confirmPassword: {
			value: "",
			type: "confirm",
			label: "Confirm Password",
			confirmTo: "password",
		},
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = () => {
		const hasErrors = handleValidation({ fields: formFields });
		setErrors(hasErrors);

		if (Object.keys(hasErrors).length === 0) {
			const { fullName, username, password, email } = formFields;
			addNewCustomer({
				fullName: fullName.value,
				username: username.value,
				password: password.value,
				email: email.value,
			});
		}
	};

	const handleTextFieldChange = (event) => {
		handleFieldChange(event, formFields, setFormFields);
	};

	useEffect(() => {
		if (addNewCustomerResponse?.isSuccess) {
			if (addNewCustomerResponse.data.Data) {
				let { fullName, username, password, confirmPassword, email } =
					formFields;
				fullName.value = "";
				username.value = "";
				email.value = "";
				password.value = "";
				confirmPassword.value = "";
				setFormFields({ fullName, username, password, confirmPassword, email });
				setTimeout(() => {
					dispatch(
						globalActionLoad({
							Message: "You will be redirected in a moment.",
							Code: 1,
						})
					);
					const {
						data: { Data },
					} = addNewCustomerResponse;

					dispatch(getUserState(Data));
					setTimeout(() => {
						navigate("/");
					}, 1500);
				}, [2100]);
			}
		}
	}, [addNewCustomerResponse]);

	return (
		<Container maxWidth="sm" sx={{ marginTop: "20px" }}>
			<Typography
				variant="h4"
				sx={{ marginBottom: "20px", textAlign: "center" }}
			>
				Sign Up
			</Typography>
			<Box
				component="form"
				sx={{
					display: "grid",
					gridTemplateColumns: "1fr",
					gap: "10px",
					margin: "auto auto",
				}}
				noValidate
				autoComplete="off"
			>
				<CustomTextField
					id="fullName"
					label="Full Name"
					variant="outlined"
					fullWidth
					value={formFields.fullName.value}
					onChange={handleTextFieldChange}
					error={errors?.fullName ? true : false}
					helperText={errors?.fullName || ""}
					type="text"
				/>
				<CustomTextField
					id="username"
					label="Username"
					variant="outlined"
					fullWidth
					value={formFields.username.value}
					onChange={handleTextFieldChange}
					error={errors?.username ? true : false}
					helperText={errors?.username || ""}
					type="text"
				/>
				<CustomTextField
					id="email"
					label="Email"
					variant="outlined"
					fullWidth
					value={formFields.email.value}
					onChange={handleTextFieldChange}
					error={errors?.email ? true : false}
					helperText={errors?.email || ""}
					type="text"
				/>
				<CustomTextField
					id="password"
					label="Password"
					variant="outlined"
					fullWidth
					value={formFields.password.value}
					onChange={handleTextFieldChange}
					error={errors?.password ? true : false}
					helperText={errors?.password || ""}
					type="password"
				/>
				<CustomTextField
					id="confirmPassword"
					label="Confirm Password"
					variant="outlined"
					fullWidth
					value={formFields.confirmPassword.value}
					onChange={handleTextFieldChange}
					error={errors?.confirmPassword ? true : false}
					helperText={errors?.confirmPassword || ""}
					type="password"
				/>
				<Box>
					<Button variant="contained" fullWidth onClick={handleSubmit}>
						SIGN UP
					</Button>
					<Divider sx={{ margin: "10px 0" }} />
					<Link to="/signin">Have already an account? Sign in</Link>
				</Box>
			</Box>
		</Container>
	);
};

export default Signup;
