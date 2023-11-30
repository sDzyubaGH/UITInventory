import React from "react";
import { Outlet } from "react-router-dom";

function GuestLayout() {
  return (
    <div className="h-full flex justify-center items-center bg-gradient-to-r from-sky-500 to-indigo-600 ">
      <Outlet />
    </div>
  );
}

export default GuestLayout;
