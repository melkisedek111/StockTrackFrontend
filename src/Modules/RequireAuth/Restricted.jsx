import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Restricted = ({ role }) => {
	const location = useLocation();
	return !role ? (
		<Outlet />
	) : (
		<Navigate to="/" state={{ from: location.pathname }} replace />
	);
};

export default Restricted;
