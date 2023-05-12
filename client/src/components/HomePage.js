import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import LaunchButton from "./Launch";
import HeaderImage from "../../src/assets/img/headerpic.jpg";

const LandingPage = () => {
  return (
    <Container>
      <Box sx={{ mt: 5, position: "relative" }}>
        <img
          src={HeaderImage}
          alt=""
          style={{ width: "100%", height: "auto", zIndex: "-1" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
            p: 5,
            mt: "-10vh",
          }}
        >
          <Typography variant="h2" sx={{ color: "#625F63" }}>
            Bandwagon.
          </Typography>

          <Typography variant="body1">
            A new meaning to listening to music on the go.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <LaunchButton text="Get Started >" to="/signUpForm" />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4">App Description</Typography>
            <Typography variant="body1">
              Bandwagon is a web application that allows users to create a road
              trip itinerary based on their music preferences. Users can enter a
              starting location and ending location, and Bandwagon will generate
              a road trip itinerary with stops at cities along the way. The
              cities are chosen based on the user’s music preferences, and the
              itinerary is generated using the Google Maps API. Users can save
              their itineraries and view them later.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <img
              src="https://images.freeimages.com/images/large-previews/4cd/it-s-a-wide-open-road-2-1-1448036.jpg"
              alt="A description of the second "
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LandingPage;
