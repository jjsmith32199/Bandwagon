import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import RoadTripPlanner from "./pages/CreateItinerary";
import SavedItinerary from "./pages/SavedItinerary";

function App() {
  const [savedItineraries, setSavedItineraries] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <RoadTripPlanner
                savedItineraries={savedItineraries}
                setSavedItineraries={setSavedItineraries}
              />
            }
          />
          <Route
            path="/SavedItinerary"
            element={
              <SavedItinerary
                savedItineraries={savedItineraries}
                setSavedItineraries={setSavedItineraries}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
