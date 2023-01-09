import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ role, allowedRoles }) => {
	const location = useLocation();
	return allowedRoles.includes(role) ? (
		<Outlet />
	) : (
		<Navigate to="/signin" state={{ from: location.pathname }} replace />
	);
};

export default RequireAuth;
