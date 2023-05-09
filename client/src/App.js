import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateItinerary from "./CreateItinerary";
import SavedItinerary from "./SavedItinerary";

function App() {
  const [savedItineraries, setSavedItineraries] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <CreateItinerary
                savedItineraries={savedItineraries}
                setSavedItineraries={setSavedItineraries}
              />
            }
          />

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
