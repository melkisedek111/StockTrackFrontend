import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, Outlet, useNavigate } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { globalActionLoad } from "../../redux/reducer/global.slice";
import { removeUserState } from "../../redux/reducer/customer.slice";
import { useDispatch } from "react-redux";
import { purgePersistor } from "../../redux/store";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Avatar, Menu, MenuItem } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const drawerWidth = 240;

const adminLinks = [
	{
		label: "Inventory",
		link: "/admin/inventory",
		icon: <InventoryIcon />,
	},
	{
		label: "Customers",
		link: "/admin/customers",
		icon: <SupervisedUserCircleIcon />,
	},
	{
		label: "Transactions",
		link: "/admin/transactions",
		icon: <ShoppingCartCheckoutIcon />,
	},
];

export default function AppNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
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
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: `calc(100% - ${drawerWidth}px)`,
					ml: `${drawerWidth}px`,
				}}
			>
				<Toolbar
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h6" noWrap component="div">
						StockTrack
					</Typography>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar />
				<Divider />
				<List>
					{adminLinks.map((item, index) => (
						<Link
							to={item.link}
							style={{ textDecoration: "none", color: "black" }}
						>
							<ListItem key={item.label} disablePadding>
								<ListItemButton>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.label} />
								</ListItemButton>
							</ListItem>
						</Link>
					))}
				</List>
				<Divider />
				<List>
					<Link to="/" style={{ textDecoration: "none", color: "black" }}>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>
									<DashboardIcon />
								</ListItemIcon>
								<ListItemText primary={"Home"} />
							</ListItemButton>
						</ListItem>
					</Link>
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
			>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
}
