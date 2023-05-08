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
            mt: "-10vh"
          }}
        >
          <Typography variant="h2" sx={{ color: "#625F63"}}>
            Bandwagon.
          </Typography>
          <Typography variant="body1">
            A new meaning to listening to music on the go.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <LaunchButton text="Get Started >" />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h4">App Description</Typography>
            <Typography variant="body1">
              Our app is designed to provide an amazing user experience. It
              offers a range of features, including...
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
