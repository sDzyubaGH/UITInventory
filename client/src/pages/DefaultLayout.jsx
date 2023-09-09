import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function DefaultLayout() {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="h-screen bg-[#0cce0cfb]">
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
