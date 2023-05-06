import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, Box } from "@mui/material";
import LandingPage from "./LandingPage";
import Footer from "./Footer";
import Navbar from "./Navbar";
import CreateItinerary from "./CreateItinerary";

const App = () => (
  <>
    <CssBaseline />
    <Box minHeight="calc(100vh - 150px)">
      <Navbar />
      <CreateItinerary />
      <LandingPage />
    </Box>
    <Footer />
  </>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
