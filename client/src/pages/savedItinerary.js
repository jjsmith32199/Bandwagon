import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const SavedItinerary = ({ savedItineraries }) => {
  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Saved Itineraries</Typography>
          </Grid>
          {savedItineraries.map((itinerary, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    Itinerary {index + 1}
                  </Typography>
                  <Typography color="text.secondary">
                    {itinerary.cities.join(" → ")}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      href={itinerary.googleMapsUrl}
                      target="_blank"
                    >
                      Open Google Maps
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={3}>
          <Link to="/">
            <Button variant="outlined" color="secondary">
              Back to Create Itinerary
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default SavedItinerary;
