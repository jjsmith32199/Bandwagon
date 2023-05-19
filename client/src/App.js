import React from "react";
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
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  );
}

function ProtectedRoute({ element, ...rest }) {
  const token = localStorage.getItem("auth-token");
  return (
    <Route
      {...rest}
      element={token ? element : <Navigate to="/loginForm" replace />}
    />
  );
}

function RoutesApp() {
  const [savedItineraries, setSavedItineraries] = useState([]);
  const navigate = useNavigate();

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("auth-token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const httpLink = createHttpLink({
    uri: "http://localhost:3001/graphql",
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  const handleLogout = useCallback(() => {
    localStorage.removeItem("auth-token");
    navigate("/");
  }, [navigate]);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/signUpForm" element={<SignUpForm />} />
          <ProtectedRoute
            path="/createItinerary"
            element={
              <CreateItinerary
                savedItineraries={savedItineraries}
                setSavedItineraries={setSavedItineraries}
              />
            }
          />
          <ProtectedRoute path="/UserProfile" element={<UserProfile />} />
          <ProtectedRoute
            path="/savedItinerary"
            element={<SavedItinerary savedItineraries={savedItineraries} />}
          />
        </Routes>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
