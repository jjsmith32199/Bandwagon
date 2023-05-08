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

// import profileImageURL from ""; replace src on line 51 with {{profileImageURL}}

export default function ButtonAppBar() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#797A9E" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            style={{ marginLeft: 26 }}
            sx={{ flexGrow: 1 }}
          >
            Bandwagon
          </Typography>
          {loggedIn ? (
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
                <MenuItem onClick={handleClose}>View Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <p>|</p>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
