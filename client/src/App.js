import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/HomePage";
import LoginForm from "./components/loginForm";
import SignUpForm from "./components/signUpForm";
import CreateItinerary from "./pages/CreateItinerary";
import SavedItinerary from "./pages/savedItinerary";

function App() {
  const [isLoggedIn, setIsLogged] = useState(false); // set to false for testing
  const [savedItineraries, setSavedItineraries] = useState([]);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleSignUp = () => {
    setIsLogged(true);
  };

  const renderCreateItinerary = () => {
    return isLoggedIn ? (
      <CreateItinerary
        savedItineraries={savedItineraries}
        setSavedItineraries={setSavedItineraries}
      />
    ) : (
      <Navigate to="/loginForm" />
    );
  };

  return (
    <BrowserRouter>
      <div className="App">
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
          <Route path="/createItinerary" element={renderCreateItinerary} />
          <Route
            path="/savedItinerary"
            element={<SavedItinerary savedItineraries={savedItineraries} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
