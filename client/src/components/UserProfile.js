import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Button,
} from "@mui/material";

const UserProfile = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGetStartedClick = () => {
    navigate("/createItinerary");
  };

  return (
    <Box
      sx={{
        marginTop: 5,
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={3} style={{ maxWidth: "100%" }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, maxWidth: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar sx={{ width: 150, height: 150 }} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">John Doe</Typography>
                <Typography variant="subtitle1">
                  john.doe@example.com
                </Typography>
                <Typography variant="subtitle2">
                  Date of Birth: 01/01/1990
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Saved Itineraries
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  mb: 2,
                  bgcolor: "background.paper",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <List>
                  <ListItem>
                    <ListItemText primary="You have no saved itineraries, click 'Get Started' to plan your next trip" />
                  </ListItem>
                </List>
              </Box>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#797A9E",
                  marginTop: theme.spacing(2),
                }}
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Saved Concerts
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  mb: 2,
                  bgcolor: "background.paper",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <List>
                  <ListItem>
                    <ListItemText primary="No saved concerts yet" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
