// import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import authAxios from "../axios";

const initialState = {
  authUser: null,
  token: null,
  setAuthUser: () => {},
  setValidToken: () => {},
};
const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setValidToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    authAxios.get("/user/auth");
  }, []);

  const setToken = (token) => {
    setValidToken(token);

    if (token) localStorage.setItem("access_token", token);
    else localStorage.removeItem("access_token", token);
  };

  return (
    <AuthContext.Provider value={{ authUser, token, setAuthUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
