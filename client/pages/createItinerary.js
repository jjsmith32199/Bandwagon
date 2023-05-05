import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100% - 16px)",
};

const center = {
  lat: 39.8283,
  lng: -98.5795,
};

const CreateIntinerary = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  // Dummy data for search results
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  const events = [
    {
      id: 1,
      title: "Event 1",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://www.example.com/event1",
      date: "2023-05-10",
      time: "19:00",
    },
    {
      id: 2,
      title: "Event 2",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://www.example.com/event2",
      date: "2023-05-11",
      time: "20:00",
    },
    {
      id: 3,
      title: "Event 3",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://www.example.com/event3",
      date: "2023-05-12",
      time: "21:00",
    },
    {
      id: 4,
      title: "Event 4",
      imageUrl: "https://via.placeholder.com/150",
      link: "https://www.example.com/event4",
      date: "2023-05-13",
      time: "22:00",
    },
  ];
  const handleSearch = (e) => {
    setSearchValue(e.target.value);

    if (e.target.value.trim() !== "") {
      setSearchResults(
        cities.filter((city) =>
          city.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    } else {
      setSearchResults([]);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCities([...selectedCities, city]);
    setSearchResults([]);
    setSearchValue("");

    // Add the selected city to the recent searches list, and remove duplicates
    setRecentSearches([...new Set([city, ...recentSearches])]);
  };

  const handleRecentSearchClick = (city) => {
    setSearchValue(city);
    setSearchResults(
      cities.filter((c) => c.toLowerCase().includes(city.toLowerCase()))
    );
  };

  const handleCityDelete = (index) => {
    setSelectedCities(selectedCities.filter((_, i) => i !== index));
  };

  const [response, setResponse] = useState(null);

  const directionsCallback = (result, status) => {
    if (status === "OK") {
      setResponse(result);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Search for a city"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={handleSearch}
            />
            {searchResults.length > 0 && (
              <Paper elevation={3}>
                <List>
                  {searchResults.map((city) => (
                    <ListItem
                      button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                    >
                      <ListItemText primary={city} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
            {recentSearches.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Recent Searches</Typography>
                <List>
                  {recentSearches.map((city) => (
                    <ListItem
                      button
                      key={city}
                      onClick={() => handleRecentSearchClick(city)}
                    >
                      <ListItemText primary={city} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Selected Cities</Typography>
            <Paper elevation={1}>
              <List>
                {selectedCities.map((city, index) => (
                  <ListItem key={city + index}>
                    <ListItemText primary={city} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleCityDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Route Map</Typography>
            <Box sx={{ height: "calc(2 * (200px + 16px))", mt: 2, mb: 2 }}>
              <LoadScript googleMapsApiKey="YOUR_API_KEY">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={4}
                >
                  {selectedCities.length > 1 && (
                    <DirectionsService
                      options={{
                        origin: selectedCities[0],
                        destination: selectedCities[selectedCities.length - 1],
                        waypoints: selectedCities
                          .slice(1, -1)
                          .map((city) => ({ location: city })),
                        travelMode: "DRIVING",
                      }}
                      callback={directionsCallback}
                    />
                  )}

                  {response && <DirectionsRenderer directions={response} />}
                </GoogleMap>
              </LoadScript>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 4 }}>
              Upcoming Events
            </Typography>
          </Grid>
          {events.slice(0, 4).map((event) => (
            <Grid item xs={12} sm={6} md={3} key={event.id}>
              <Card>
                <CardActionArea href={event.link} target="_blank">
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.imageUrl}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.date} - {event.time}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    href={event.link}
                    target="_blank"
                  >
                    Buy Tickets
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateIntinerary;
