import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { globalActionLoad } from "../../redux/reducer/global.slice";
import { purgePersistor } from "../../redux/store";
import { removeUserState } from "../../redux/reducer/customer.slice";

const pages = [
	{
		label: "Products",
		link: "/",
		isRestricted: false,
	},
	{
		label: "Cart",
		link: "/cart",
		isRestricted: true,
	},
	{
		label: "Order",
		link: "/orders",
		isRestricted: true,
	},
];
const settings = ["Logout"];

function Navbar() {
	const currentCustomer = useSelector((state) => state.customer);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleSignOut = () => {
		dispatch(
			globalActionLoad({ Code: 1, Message: "Signing out", isLoading: true })
		);

		purgePersistor();

		setTimeout(() => {
			dispatch(removeUserState());
			dispatch(globalActionLoad({ isLoading: false }));
			navigate("/signin");
		}, 2500);
	};

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="/"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							LOGO
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
								}}
							>
								{pages.map((page) => (
									<Link to={page.link} style={{ textDecoration: "none" }}>
										<MenuItem key={page.label} onClick={handleCloseNavMenu}>
											<Typography textAlign="center">{page.label}</Typography>
										</MenuItem>
									</Link>
								))}
							</Menu>
						</Box>
						<AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
						<Typography
							variant="h5"
							noWrap
							component="a"
							href=""
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							TrackShop
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
							{pages.map((page) => {
								return !page.isRestricted ||
									currentCustomer?.customer?.user_id ? (
									<Link to={page.link} style={{ textDecoration: "none" }}>
										<Button
											key={page.label}
											onClick={handleCloseNavMenu}
											sx={{ my: 2, color: "white", display: "block" }}
										>
											{page.label}
										</Button>
									</Link>
								) : null;
							})}
							{currentCustomer?.customer?.role === 0 ? (
								<Link to="/admin/inventory" style={{ textDecoration: "none" }}>
									<Button
										onClick={handleCloseNavMenu}
										sx={{ my: 2, color: "white", display: "block" }}
									>
										Admin
									</Button>
								</Link>
							) : null}
						</Box>
						{currentCustomer.customer?.user_id ? (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar
											alt="Remy Sharp"
											src="/static/images/avatar/2.jpg"
										/>
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									<MenuItem onClick={handleSignOut}>
										<Typography textAlign="center">Logout</Typography>
									</MenuItem>
								</Menu>
							</Box>
						) : (
							<Box sx={{ flexGrow: 0 }}>
								<Link to="/signin" style={{ textDecoration: "none" }}>
									<Button variant="contained" color="success">
										Sign In
									</Button>
								</Link>
							</Box>
						)}
					</Toolbar>
				</Container>
			</AppBar>
			<Outlet />
		</>
	);
}
export default Navbar;
