import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

const LandingPage = () => {
  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <img
              src="https://images.freeimages.com/images/large-previews/4f4/on-the-road-1633029.jpg"
              alt="A description of the first "
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="column"
            justifyContent="center"
          >
            <Box>
              <Typography variant="h2">Welcome to Our App!</Typography>
              <Typography variant="body1">
                Experience the best features of our app.
              </Typography>
            </Box>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" size="large">
                Get Started
              </Button>
            </Box>
          </Grid>
        </Grid>

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
      </Box>
    </Container>
  );
};

export default LandingPage;
