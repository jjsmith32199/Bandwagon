import React from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 6, bgcolor: "#797A9E", color: "white" }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">BandWagon</Typography>
            <Typography variant="body2">
              1234 Street St.
              <br />
              City, State, ZIP
              <br />
              Country
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Quick Links</Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">
                About Us
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Services
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Contact
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Social Media</Typography>
            <Typography variant="body2">
              <Link href="#" color="inherit" underline="hover">
                Facebook
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Twitter
              </Link>
              <br />
              <Link href="#" color="inherit" underline="hover">
                Instagram
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} BandWagon LLC. All rights
            reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
