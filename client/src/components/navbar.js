import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

// import profileImageURL from ""; replace src on line 51 with {{profileImageURL}}

export default function ButtonAppBar() {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate(); // Used to redirect the user
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the home page
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#797A9E" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Bandwagon
            </Link>
          </Typography>
          {loggedIn() ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  marginRight: 1,
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                src="https://picsum.photos/id/237/200/300"
                alt="Profile Image"
                onClick={handleProfileClick}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate("/UserProfile");
                  }}
                >
                  View Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/loginForm">
                Login
              </Button>
              <p>|</p>
              <Button color="inherit" component={RouterLink} to="/signUpForm">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
