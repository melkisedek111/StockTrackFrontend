import {
	Box,
	Button,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
	handleFieldChange,
	handleValidation,
} from "../../../helpers/form.helper.jsx";
import { useAddNewProductMutation } from "../../../redux/api/product.api.js";
import CustomTextField from "../../Customs/CustomTextfield.jsx";

const ProductForm = ({ closeModal }) => {
	const [addNewProduct, addNewProductResponse] = useAddNewProductMutation();
	const [errors, setErrors] = useState({});

	const [formFields, setFormFields] = useState({
		name: {
			value: "",
			type: "",
			label: "Full Name",
		},
		brand: {
			value: "",
			type: "",
			label: "Brand",
		},
		feature: {
			value: "",
			type: "",
			label: "Feature",
		},
		price: {
			value: "",
			type: "decimal",
			label: "Price",
		},
		quantity: {
			value: "",
			type: "digit",
			label: "Quantity",
		},
		category: {
			value: "",
			type: "",
			label: "Category",
		},
		imageUrl: {
			value: "",
			type: "",
			label: "Image URL",
		},
	});

	const handleTextFieldChange = (event) => {
		handleFieldChange(event, formFields, setFormFields);
	};

	const handleSubmit = () => {
		const hasErrors = handleValidation({ fields: formFields });
		setErrors(hasErrors);

		if (Object.keys(hasErrors).length === 0) {
			const { name, brand, feature, price, quantity, category, imageUrl } =
				formFields;
			addNewProduct({
				name: name.value,
				brand: brand.value,
				feature: feature.value,
				price: parseFloat(price.value),
				quantity: Number(quantity.value),
				category: category.value,
				imageUrl: imageUrl.value,
			});
		}
	};

	useEffect(() => {
		if (addNewProductResponse?.isSuccess) {
			let { name, brand, feature, price, quantity, category, imageUrl } = formFields;
			name.value = "";
			brand.value = "";
			feature.value = "";
			price.value = "";
			quantity.value = "";
			category.value = "";
			imageUrl.value = "";
			setFormFields({ name, brand, feature, price, quantity, category, imageUrl });
		}
	}, [addNewProductResponse]);

	return (
		<Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
			<CustomTextField
				id="name"
				label="Name"
				variant="outlined"
				fullWidth
				value={formFields.name.value}
				onChange={handleTextFieldChange}
				error={errors?.name ? true : false}
				helperText={errors?.name || ""}
				type="text"
			/>
			<CustomTextField
				id="brand"
				label="Brand"
				variant="outlined"
				fullWidth
				value={formFields.brand.value}
				onChange={handleTextFieldChange}
				error={errors?.brand ? true : false}
				helperText={errors?.brand || ""}
				type="text"
			/>
			<CustomTextField
				id="feature"
				label="Feature"
				variant="outlined"
				fullWidth
				value={formFields.feature.value}
				onChange={handleTextFieldChange}
				error={errors?.feature ? true : false}
				helperText={errors?.feature || ""}
				type="text"
			/>
			<CustomTextField
				id="price"
				label="Price"
				variant="outlined"
				fullWidth
				value={formFields.price.value}
				onChange={handleTextFieldChange}
				error={errors?.price ? true : false}
				helperText={errors?.price || ""}
				type="text"
			/>
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
			<CustomTextField
				isSelect
				labelId="category-label"
				id="category"
				name="category"
				label="Category"
				variant="outlined"
				menuItems={["Clothing", "Shoes", "Accessories", "Bags", "Sports"]}
				value={formFields.category.value}
				onChange={handleTextFieldChange}
				error={errors?.category ? true : false}
				helperText={errors?.category || ""}
				type="text"
			/>
			<CustomTextField
				id="imageUrl"
				label="Image URL"
				variant="outlined"
				fullWidth
				value={formFields.imageUrl.value}
				onChange={handleTextFieldChange}
				error={errors?.imageUrl ? true : false}
				helperText={errors?.imageUrl || ""}
				type="text"
			/>
			<Divider />
			<Box sx={{ display: "flex", justifyContent: "end" }}>
				<Button color="primary" onClick={handleSubmit}>
					Submit
				</Button>
				<Button color="error" onClick={closeModal}>
					Cancel
				</Button>
			</Box>
		</Box>
	);
};

export default ProductForm;
