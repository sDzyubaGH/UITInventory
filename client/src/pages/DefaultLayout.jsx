import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";

function DefaultLayout() {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
