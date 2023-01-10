import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
	handleFieldChange,
	handleValidation,
} from "../../../helpers/form.helper.jsx";
import { useAddQuantityMutation } from "../../../redux/api/product.api.js";
import CustomTextField from "../../Customs/CustomTextfield.jsx";

const AddQuantityForm = ({ product }) => {
	const [addQuantity, addQuantityResponse] = useAddQuantityMutation();
	const [errors, setErrors] = useState({});
	const [formFields, setFormFields] = useState({
		quantity: {
			value: "",
			type: "digit",
			label: "Quantity",
		},
	});

	const handleTextFieldChange = (event) => {
		handleFieldChange(event, formFields, setFormFields);
	};

	const handleSubmit = () => {
		const hasErrors = handleValidation({ fields: formFields });
		setErrors(hasErrors);

		if (Object.keys(hasErrors).length === 0) {
			const { quantity } = formFields;
			addQuantity({ productId: product.id, quantity: Number(quantity.value) });
		}
	};

	useEffect(() => {
		if (addQuantityResponse?.isSuccess) {
			let { quantity } = formFields;
			quantity.value = "";
			setFormFields({ quantity });
		}
	}, [addQuantityResponse]);

	return (
		<Box style={{ display: "grid" }}>
			<CustomTextField
				id="quantity"
				label="Quantity"
				variant="outlined"
				fullWidth
				value={formFields.quantity.value}
				onChange={handleTextFieldChange}
				error={errors?.quantity ? true : false}
				helperText={errors?.quantity || ""}
				type="text"
			/>
			<Button
				variant="contained"
				style={{ marginTop: "20px" }}
				fullWidth
				onClick={handleSubmit}
			>
				Add
			</Button>
		</Box>
	);
};

export default AddQuantityForm;
