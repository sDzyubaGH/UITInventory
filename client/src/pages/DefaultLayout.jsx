import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";

function DefaultLayout() {
  const { token } = useAuth();

  // if (!token) return <Navigate to="/login" />;

  return (
    <div className="h-full  bg-gray-100">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
