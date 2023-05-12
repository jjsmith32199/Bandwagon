import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import Footer from "./components/Footer";
import Navbar from "./components/navbar";
import LandingPage from "./components/HomePage";
import LoginForm from "./components/loginForm";
import SignUpForm from "./components/signUpForm";
import CreateItinerary from "./pages/CreateItinerary";
import SavedItinerary from "./pages/savedItinerary";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

const handleSignUp = () => {};
const handleLogin = () => {};

const App = () => (
  <ApolloProvider client={client}>
    <CssBaseline />
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/loginForm"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path="/signUpForm"
          element={<SignUpForm handleSignUp={handleSignUp} />}
        />
        <Route path="/createItinerary" element={<CreateItinerary />} />
        <Route path="/savedItinerary" element={<SavedItinerary />} />
      </Routes>
      <Footer />
    </Router>
  </ApolloProvider>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
