import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("id_token") || ""
  );

  const login = (token) => {
    localStorage.setItem("id_token", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("id_token");
    setAuthToken("");
  };

  const loggedIn = () => {
    return Boolean(authToken);
  };

  const getToken = () => {
    return authToken;
  };

  const value = {
    loggedIn,
    login,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
