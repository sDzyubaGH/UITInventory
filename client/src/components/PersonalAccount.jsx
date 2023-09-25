import React, { useState } from "react";
import authAxios from "../axios";

export default function PersonalAccount() {
  const handleUserName = async () => {
    const response = await authAxios.get("/user/login", { login });
    return response;
  };

  return (
    <div className="flex items-center mr-10">
      <div className=" flex border-2 py-2 pl-3 pr-10 rounded-lg ">
        <p className=" text-xl font-semibold">{handleUserName}</p>
        <img className="ml-10" src="" alt="loading..." />
      </div>
    </div>
  );
}
