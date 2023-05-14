import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  Autocomplete,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const libraries = ["places"];

const CreateItinerary = () => {
  const findMidPoint = (lat1, lng1, lat2, lng2) => {
    const dLon = (lng2 - lng1) * (Math.PI / 180);

    const lat1InRadians = lat1 * (Math.PI / 180);
    const lat2InRadians = lat2 * (Math.PI / 180);
    const lng1InRadians = lng1 * (Math.PI / 180);

    const Bx = Math.cos(lat2InRadians) * Math.cos(dLon);
    const By = Math.cos(lat2InRadians) * Math.sin(dLon);
    const midLat = Math.atan2(
      Math.sin(lat1InRadians) + Math.sin(lat2InRadians),
      Math.sqrt(
        (Math.cos(lat1InRadians) + Bx) * (Math.cos(lat1InRadians) + Bx) +
          By * By
      )
    );
    const midLng = lng1InRadians + Math.atan2(By, Math.cos(lat1InRadians) + Bx);

    return { lat: midLat * (180 / Math.PI), lng: midLng * (180 / Math.PI) };
  };

  const [searchValue, setSearchValue] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [geocoder, setGeocoder] = useState(null);
  const [events, setEvents] = useState([]);
  const [savedItineraries, setSavedItineraries] = useState([]);

  const saveItinerary = () => {
    console.log("saveItinerary called");

    if (typeof setSavedItineraries === "function") {
      setSavedItineraries([
        ...savedItineraries,
        {
          cities: selectedCities,
          googleMapsUrl: generateGoogleMapsUrl(),
          events: events.slice(0, 4),
        },
      ]);
    } else {
      console.error(
        "setSavedItineraries is not a function:",
        setSavedItineraries
      );
    }
  };

  const containerStyle = {
    width: "100%",
    height: "calc(100% - 16px)",
  };

  const autoCompleteRef = useRef(null);

  const [center, setCenter] = useState({
    lat: 39.8283,
    lng: -98.5795,
  });
  const getCityCoordinates = async (city) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === "OK") {
          resolve({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          reject(new Error(`Geocode failed for ${city} with status ${status}`));
        }
      });
    });
  };

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      if (selectedCities.length > 1) {
        const cityA = selectedCities[0];
        const cityB = selectedCities[selectedCities.length - 1];

        const cityACoords = await getCityCoordinates(cityA);
        const cityBCoords = await getCityCoordinates(cityB);

        const midPoint = findMidPoint(
          cityACoords.lat,
          cityACoords.lng,
          cityBCoords.lat,
          cityBCoords.lng
        );

        if (isFinite(midPoint.lat) && isFinite(midPoint.lng)) {
          try {
            const response = await axios.get(
              `https://api.seatgeek.com/2/events?lat=${midPoint.lat}&lon=${midPoint.lng}&range=100mi&type=concert&client_id=NjkxODY3NXwxNjgzNDAyMzA3LjQzNjgwMjY`
            );

            if (response.data && response.data.events) {
              const currentTime = new Date();

              const filteredEvents = response.data.events.filter((event) => {
                const eventTime = new Date(event.datetime_local);
                return eventTime > currentTime;
              });

              setEvents(filteredEvents);
            }
          } catch (error) {
            // Handle error if API request fails
          }
        }
      } else {
        setEvents([]);
      }
    };

    const fetchData = async () => {
      await fetchEvents();
    };

    fetchData();
    return () => {
      const source = axios.CancelToken.source();
      const cancelToken = source.token;

      axios
        .get(
          `https://api.seatgeek.com/2/events?lat=${midPoint.lat}&lon=${midPoint.lng}&range=100mi&type=concert&client_id=NjkxODY3NXwxNjgzNDAyMzA3LjQzNjgwMjY`,
          { cancelToken }
        )
        .then((response) => {})
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Request canceled", error.message);
          } else {
          }
        });

      return () => {
        source.cancel();
      };
    };
  }, [selectedCities]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCitySelect = (cityName, formattedAddress) => {
    if (!selectedCities.includes(cityName)) {
      setSelectedCities([...selectedCities, cityName]);
      setSearchValue("");
      setRecentSearches([...new Set([cityName, ...recentSearches])]);
      updateMapCenter(formattedAddress);
    }
  };

  const generateGoogleMapsUrl = () => {
    if (selectedCities.length > 1) {
      const origin = encodeURIComponent(selectedCities[0]);
      const destination = encodeURIComponent(
        selectedCities[selectedCities.length - 1]
      );
      const waypoints = selectedCities
        .slice(1, -1)
        .map((city) => `via:${encodeURIComponent(city)}`)
        .join("|");

      return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;
    }

    return null;
  };

  const handleCityDelete = (index) => {
    setSelectedCities(selectedCities.filter((_, i) => i !== index));
  };

  const updateMapCenter = (city) => {
    geocoder.geocode({ address: city }, (results, status) => {
      if (status === "OK") {
        const newCenter = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        setCenter(newCenter);
      }
    });
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
            <LoadScript
              googleMapsApiKey="AIzaSyCTRDgdeo20kDLLxMRrewL2Coi-TrAWF8c"
              libraries={libraries}
            >
              <Autocomplete
                onLoad={(autocomplete) => {
                  autoCompleteRef.current = autocomplete;
                }}
                onPlaceChanged={() => {
                  if (autoCompleteRef.current !== null) {
                    const place = autoCompleteRef.current.getPlace();
                    if (place.address_components) {
                      const city = place.address_components.find((component) =>
                        component.types.includes("locality")
                      );
                      const state = place.address_components.find((component) =>
                        component.types.includes("administrative_area_level_1")
                      );
                      if (city && state) {
                        const cityNameWithState = `${city.long_name}, ${state.short_name}`;
                        handleCitySelect(
                          cityNameWithState,
                          place.formatted_address
                        );
                      }
                    }
                  }
                }}
              >
                <TextField
                  label="Search for a city"
                  variant="outlined"
                  fullWidth
                  value={searchValue}
                  onChange={handleSearch}
                />
              </Autocomplete>
            </LoadScript>
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
              <LoadScript
                googleMapsApiKey="AIzaSyCTRDgdeo20kDLLxMRrewL2Coi-TrAWF8c"
                libraries={libraries}
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={4}
                  onLoad={(map) => {
                    setGeocoder(new window.google.maps.Geocoder());
                  }}
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
            <Button
              variant="contained"
              color="primary"
              disabled={selectedCities.length < 2}
              href={generateGoogleMapsUrl()}
              target="_blank"
            >
              Open Google Maps
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disabled={selectedCities.length < 2}
              onClick={saveItinerary}
            >
              Save Itinerary
            </Button>
            <Link to="/savedItinerary">
              <Button variant="outlined" color="secondary">
                View Saved Itineraries
              </Button>
            </Link>
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
                <CardActionArea href={event.url} target="_blank">
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.performers[0].image}
                    alt={event.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.datetime_local).toLocaleString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    href={event.url}
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

export default CreateItinerary;
