import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

const LandingPage = () => {
  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <img src="" alt="" style={{ width: "100%", height: "auto" }} />
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
          <img src="" alt="" style={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
