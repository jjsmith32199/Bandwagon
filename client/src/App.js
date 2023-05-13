import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import LandingPage from "./components/HomePage";
import LoginForm from "./components/loginForm";
import SignUpForm from "./components/signUpForm";
import CreateItinerary from "./pages/CreateItinerary";
import SavedItinerary from "./pages/savedItinerary";
import { useHistory } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLogged] = useState(false); // set to false for testing
  const [savedItineraries, setSavedItineraries] = useState([]);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const history = useHistory();

  const handleSignUp = () => {
    setIsLogged(true);
    history.push("/CreateItinerary");
  };

  const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

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
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
