import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "../../components/AppBar.jsx";
import Toolbar from "../../components/Toolbar.jsx";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function MyAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/src/pages/Home.jsx"
            sx={{ fontSize: 24 }}
          >
            {"Organize your to-do list, your way"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/src/pages/SignIn.jsx"
              sx={rightLink}
            >
              {"Sign In"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/src/pages/SignUp.jsx"
              sx={{ ...rightLink, color: "secondary.main" }}
            >
              {"Sign Up"}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default MyAppBar;
