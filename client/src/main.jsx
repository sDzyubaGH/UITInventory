import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routes.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
  // {/* </React.StrictMode> */}
);
