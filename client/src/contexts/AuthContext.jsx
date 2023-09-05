import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
import authAxios from "../axios";

const initialState = {
  authUser: null,
  token: null,
  setAuthUser: () => {},
  setValidToken: () => {},
};
const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setValidToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    authAxios.post("/auth");
  }, []);

  const setToken = (token) => {
    setValidToken(token);

    if (token) localStorage.setItem("access_token", token);
    else localStorage.removeItem("access_token", token);
  };

  return <AuthContextProvider value={{}}>{children}</AuthContextProvider>;
};

export default AuthContextProvide;
