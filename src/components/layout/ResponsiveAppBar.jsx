import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "../AppBar.jsx";
import Toolbar from "../ToolBar.jsx";
import Typography from "../Typography.jsx";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigateTo = useNavigate();

  const isAuthenticated = localStorage.getItem("token") !== null;

  const settings = ["Profile", "Dashboard"];
  isAuthenticated ? settings.push("Logout") : settings.push("Login");

  let pages = [];
  !isAuthenticated
    ? pages.push("Sign In", "Sign Up")
    : pages.push("Home", "About Us", "Contact Us");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event, page) => {
    setAnchorElNav(null);

    switch (page) {
      case "Sign In":
        navigateTo("/Sign-in");
        break;
      case "Sign Up":
        navigateTo("/Sign-up");
        break;
      case "Home":
        navigateTo("/");
        break;
      case "About Us":
        navigateTo("/About-us");
      case "Contact Us":
        navigateTo("/Contact-us");
        break;
      default:
        break;
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event, setting) => {
    setAnchorElUser(null);

    switch (setting) {
      case "Profile":
        // Navigate to the profile page
        navigateTo("/Profile");
        break;
      case "Dashboard":
        // Navigate to the dashboard page
        navigateTo("/Dashboard");
        break;
      case "Logout":
        // Clear the token on logout
        localStorage.removeItem("token");
        // Navigate to the sign-in page
        navigateTo("/Sign In");
        break;
      case "Login":
        // Navigate to the sign-in page
        navigateTo("/Sign In");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* MENU ICON */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open Navigation">
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
              </Tooltip>
              <Menu
                sx={{ mt: "45px", display: "block" }}
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={(event) => handleCloseNavMenu(event, page)}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* ICON AND ABBREVIATION */}
            <AdbIcon sx={{ display: "block", mr: 1 }} />
            <Typography
              onClick={() => {
                !isAuthenticated ? navigateTo("/Sign In") : navigateTo("/");
              }}
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: "block",
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HD
            </Typography>

            {/* USER SETTİNGS */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="#" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", display: "block" }}
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
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={(event) => handleCloseUserMenu(event, setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveAppBar;
