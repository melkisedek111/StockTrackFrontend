let BACKEND_URL = `${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/api/`;
if(process.env.NODE_ENV === 'production'){
	BACKEND_URL = `${process.env.BACKEND_PROD_HOST}/api/`;
}

console.log(BACKEND_URL, 222020202)
export const APIConstant = {
	BACKEND_HOST: process.env.BACKEND_HOST,
	BACKEND_PORT: process.env.BACKEND_PORT,
	BACKEND_URL
};

export const AlertConstant = {
	0: "",
	1: "success",
	2: "error",
	3: "warning",
	4: "info"
};

export const OrderChipStatus = {
	0: "Processing",
	1: "Shipped",
	2: "Delivered",
	3: "Cancelled"
}

export const OrderChipStatusColor = {
	0: "warning",
	1: "primary",
	2: "success",
	3: "error"
}