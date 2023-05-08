import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, Box } from "@mui/material";
// import LandingPage from "./components/HomePage";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import CreateItinerary from "./pages/CreateItinerary";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <>
    <CssBaseline />
    <Box minHeight="calc(100vh - 150px)">
      <Navbar />
      <CreateItinerary />
    </Box>
    <Footer />
  </>
);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
