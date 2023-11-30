import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import authAxios from "../service/axios";
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
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  useEffect(() => {
    try {
      authAxios.get("/user/auth");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
      } else {
        console.log("Произошла ошибка:", error.message);
      }
    }
  }, []);

  const setToken = (token) => {
    setValidToken(token);
    const decoded = jwt_decode(token);
    localStorage.setItem("user", JSON.stringify(decoded));
    setUser(decoded);
    if (token) localStorage.setItem("access_token", token);
    else localStorage.removeItem("access_token", token);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
