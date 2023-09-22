import React, { useState } from "react";
import Navigation from "../components/Navigation";

const Home = ({ data }) => {
  return (
    <div className="overflow-auto">
      <div className=" flex justify-center mt-20">
        <div className="flex bg-gray-400 w-1/2 rounded-lg ">
          <table class="w-full text-sm text-left text-gray-500  dark:text-gray-400">
            <thead className="text-xl flex justify-between px-10 py-3 ">
              <th className="text-white">Info</th>
              <th className="text-white">Name</th>
              <th className="text-white">Action</th>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Home;
