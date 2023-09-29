// import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import authAxios from "../axios";
import jwt_decode from "jwt-decode";

const initialState = {
  token: null,
  userName: null,
  setUserName: () => {},
  setValidToken: () => {},
};
const AuthContext = createContext(initialState); // объявление контекста

//Создаем провайдер от нашего контекста
export const AuthContextProvider = ({ children }) => {
  const [token, setValidToken] = useState(localStorage.getItem("access_token"));
  const [user, setUser] = useState({});

  useEffect(() => {
    if (location.pathname !== "/reg" || location.pathname !== "/login")
      authAxios.get("/user/auth");
  }, []);

  const setUserFromToken = (token) => {
    const decodedToken = jwt_decode(token)
    setUser(decodedToken)
  }

  const setToken = (token) => {
    setValidToken(token);

    if (token) localStorage.setItem("access_token", token);
    else localStorage.removeItem("access_token", token);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUserFromToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
