import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function PersonalAccount() {
  const { user } = useAuth();
  // console.log(userName);
  return (
    <div className="flex items-center mr-10">
      <div className=" flex border-2 py-2 pl-3 pr-10 rounded-lg ">
        <p className=" text-xl font-semibold">{user.firstName}</p>
        <img className="ml-10" src="" alt="loading..." />
      </div>
    </div>
  );
}
