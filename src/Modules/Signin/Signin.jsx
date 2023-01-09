import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Container,
	Divider,
	TextField,
	Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSigninCustomerMutation } from "../../redux/api/customer.api.js";
import { handleFieldChange, handleValidation } from "../../helpers/form.helper.jsx";
import CustomTextField from "../Customs/CustomTextfield.jsx";
import { useDispatch } from "react-redux";
import { globalActionLoad } from "../../redux/reducer/global.slice.js";
import { getUserState } from "../../redux/reducer/customer.slice.js";

const Signin = () => {
	const [signinCustomer, signinCustomerResponse] = useSigninCustomerMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [formFields, setFormFields] = useState({
		username: {
			value: "",
			type: "",
			label: "Username",
		},
		password: {
			value: "",
			type: "",
			label: "Password",
		},
	});

	const handleSignin = () => {
		const hasErrors = handleValidation({ fields: formFields });
		setErrors(hasErrors);

		if (Object.keys(hasErrors).length === 0) {
			const { fullName, username, password } = formFields;
			signinCustomer({
				username: username.value,
				password: password.value,
			});
		}
	};

	const handleTextFieldChange = (event) => {
		handleFieldChange(event, formFields, setFormFields);
	};

	useEffect(() => {
		if (signinCustomerResponse?.isSuccess) {
			setTimeout(() => {
				dispatch(
					globalActionLoad({
						Message: "Your are successfully signed in.",
						Code: 1,
					})
				);
				const {
					data: { Data },
				} = signinCustomerResponse;

				dispatch(getUserState(Data));
				setTimeout(() => {
					navigate("/");
				}, 1500);
			}, [2100]);
		}
	}, [signinCustomerResponse]);

	return (
		<Container maxWidth="sm" sx={{ marginTop: "20px" }}>
			<Typography
				variant="h4"
				sx={{ marginBottom: "20px", textAlign: "center" }}
			>
				Sign In
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
				<Box>
					<Button variant="contained" fullWidth onClick={handleSignin}>
						SIGN IN
					</Button>
					<Divider sx={{ margin: "10px 0" }} />
					<Link to="/signup">Don't have an account? Sign Up</Link>
				</Box>
			</Box>
		</Container>
	);
};

export default Signin;
