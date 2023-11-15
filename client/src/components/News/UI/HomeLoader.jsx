import React from "react";

function HomeLoader() {
  return (
    <div class="flex flex-col items-center justify-center h-screen">
      <div class="relative">
        <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-indigo-600 animate-spin"></div>
      </div>
      <p className="font-myFont mt-2 text-xl ">Loading...</p>
    </div>
  );
}

export default HomeLoader;
