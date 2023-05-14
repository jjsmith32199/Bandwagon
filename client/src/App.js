import React, { useState, useEffect, useRef } from "react";
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
import UserProfile from "./components/UserProfile";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

function RoutesApp() {
  const [isLoggedIn, setIsLogged] = useState(false); // set to false for testing
  const [savedItineraries, setSavedItineraries] = useState([]);
  const navigate = useNavigate();
  const isMountedRef = useRef(false);

  const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("auth-token");
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

  const handleLogin = () => {
    if (isMountedRef.current) {
      setIsLogged(true);
      navigate("/userProfile");
    }
  };

  const handleSignUp = () => {
    if (isMountedRef.current) {
      setIsLogged(true);
      navigate("/userProfile");
    }
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

  useEffect(() => {
    isMountedRef.current = true;

    const token = localStorage.getItem("auth-token");
    if (token) {
      setIsLogged(true);
      navigate("/UserProfile");
    } else {
      setIsLogged(false);
    }

    return () => {
      isMountedRef.current = false;
      // Cleanup tasks (cancel subscriptions, clear timeouts/intervals, etc.)
    };
  }, [navigate]);

  return (
    <ApolloProvider client={client}>
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
          <Route path="/createItinerary" element={renderCreateItinerary()} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route
            path="/savedItinerary"
            element={<SavedItinerary savedItineraries={savedItineraries} />}
          />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
