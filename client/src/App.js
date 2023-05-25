import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <RoutesApp />
      </Router>
    </AuthProvider>
  );
}

function RoutesApp() {
  const [savedItineraries, setSavedItineraries] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  const authLink = setContext((_, { headers }) => {
    const token = auth.getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = createHttpLink({
    uri: "https://whispering-island-08807.herokuapp.com/graphql",
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const handleLogout = useCallback(() => {
    auth.logout();
    navigate("/");
  }, [navigate, auth]);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/signUpForm" element={<SignUpForm />} />
          {auth.loggedIn() && (
            <>
              <Route
                path="/createItinerary"
                element={
                  <CreateItinerary
                    savedItineraries={savedItineraries}
                    setSavedItineraries={setSavedItineraries}
                  />
                }
              />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route
                path="/savedItinerary"
                element={<SavedItinerary savedItineraries={savedItineraries} />}
              />
            </>
          )}
        </Routes>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
