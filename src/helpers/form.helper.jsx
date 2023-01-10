import React from "react";
/**
 * DOCUMENT: This function is used to validate form fields <br>
 * Triggered: need when submitting form <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @memberOf FormHelper
 * @param object - { fields }
 * @author Mel
 */
export const handleValidation = ({ fields }) => {
	/* validation for password */
	const passwordValidation =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[\S]{8,}$/;

	/* validation for username */
	const usernameValidation = /^[a-zA-Z0-9._-]{3,15}$/;

	/* normal validation */
	const normalValidation = /^[a-zA-Z ]+$/;

	/* decimal validation */
	const decimalValidation = /^-?\d*\.?\d+$/;

	/* digit validation */
	const digitValidation = /^[0-9]+$/;

	/* email validation */
	const emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	const errors = {};

	/* this loop is used to iterate each of the default fields to check for errors and validations */
	for (const field in fields) {
		const { type, label, value, confirmTo } = fields[field];
		const trimmedValue = value.trim();

		/* check for empty value */
		if (!trimmedValue) {
			errors[field] = `${label} is empty. Please insert the field.`;
		} else if (type === "letter|space|dot") {
			/* check if the field is letter only, space and dot */
			if (!trimmedValue.match(normalValidation)) {
				errors[field] = `${label} must be an alphabet only.`;
			}
		} else if (type === "digit") {
			/* check if the field is letter only, space and dot */
			if (!trimmedValue.match(digitValidation)) {
				errors[field] = `${label} must be a digit.`;
			}
		} else if (type === "email") {
			/* check if the field is letter only, space and dot */
			if (!trimmedValue.match(emailValidation)) {
				errors[field] = `${label} must be a a valid email.`;
			}
		} else if (type === "decimal") {
			/* check if the field is letter only, space and dot */
			if (!trimmedValue.match(decimalValidation)) {
				errors[field] = `${label} must be a decimal.`;
			}
		} else if (type === "username") {
			/* check if the field is username only */
			if (!trimmedValue.match(usernameValidation)) {
				errors[field] = [
					"Is at least 3 characters long and no more than 15 characters",
					"Contains only letters (uppercase or lowercase), numbers, dots, underscores, and hyphens",
				];
			}
		} else if (type === "password") {
			/* check if the field is password only */
			if (!trimmedValue.match(passwordValidation)) {
				errors[field] = [
					"Is at least 8 characters long",
					"Contains at least 1 lowercase letter",
					"Contains at least 1 uppercase letter",
					"Contains at least 1 number",
					"Contains at least 1 special character (!, @, #, etc.)",
				];
			}
		} else if (type === "confirm") {
			/* check on what fields that need to confirm to */
			if (fields[confirmTo]) {
				/* check if the field is password only */
				if (trimmedValue !== fields[confirmTo].value) {
					errors[field] = `Your ${label} does not matched.`;
				}
			}
		}
	}

	return errors;
};

/**
 * DOCUMENT: This function is used to handle value of each fields. <br>
 * Triggered: when insert value on the fields <br>
 * Last Updated Date: December 29, 2022
 * @function
 * @memberOf FormHelper
 * @param {} - event
 * @author Mel
 */
export const handleFieldChange = (event, formFields, setFormFields) => {
	let {
		target: { value, name, id },
	} = event;

	const key = id || name;
	if (formFields[key]) {
		setFormFields({ ...formFields, [key]: { ...formFields[key], value } });
	}
};
