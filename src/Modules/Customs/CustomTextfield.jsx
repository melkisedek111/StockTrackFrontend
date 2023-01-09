import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import React from "react";

const CustomTextField = (props) => {
	const {
		isSelect,
		labelId,
		label,
		menuItems,
		children,
		helperText,
		error,
		...otherProps
	} = props;
	return (
		<FormControl>
			{isSelect ? (
				<>
					<InputLabel id={'category-label'} error={error}>{label}</InputLabel>
					<Select {...otherProps} error={error} label={label} labelId={'category-label'}>
						{menuItems.map((menu, index) => (
							<MenuItem key={index} value={menu}>{menu}</MenuItem>
						))}
					</Select>
				</>
			) : (
				<TextField {...otherProps} label={label} error={error} />
			)}
			{error ? (
				Array.isArray(helperText) ? (
					helperText.map((message, index) => (
						<FormHelperText key={index} error={error}>
							{message}
						</FormHelperText>
					))
				) : (
					<FormHelperText error={error}>{helperText}</FormHelperText>
				)
			) : null}
		</FormControl>
	);
};

export default CustomTextField;
