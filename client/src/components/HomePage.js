import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import LaunchButton from "./Launch";
import HeaderImage from "../../src/assets/img/headerpic.jpg";
import DescriptionImage from "../assets/img/description-pic.jpg";
import ScrollAnimation from './ScrollAnimation';

const LandingPage = () => {
  return (
    <Container>
      <Box sx={{ mt: 5, position: "relative" }}>
        <img
          src={HeaderImage}
          alt="group of people at a concert"
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


      <ScrollAnimation>
         <Box sx={{ mt: 5 }}>
          <Grid container spacing={3} alignItems="center">
           <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ color: "#625F63", textAlign: "center" }}>
             Hit the road. Find live music.
           </Typography>
           <Typography variant="body1" sx={{ textAlign: "center" }}>
             <br />
             Craft your perfect road trip experience.
             <br />
              Choose your destinations, discover live music en route.
           </Typography>
           <Box sx={{ mt: 4, textAlign: "center" }}>
            <LaunchButton text="create my itinerary >" to="/CreateItinerary" />
          </Box>
           </Grid>
            <Grid item xs={12} md={6}>
               <img
                  src={DescriptionImage}
                  alt="a woman hanging out the window of a car"
                  style={{ width: "100%", height: "auto" }}
                />
           </Grid>
          </Grid>
         </Box>
      </ScrollAnimation>

    </Container>
  );
};

export default LandingPage;
