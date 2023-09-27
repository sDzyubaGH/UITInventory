import React from "react";

function SideBar() {
  return (
    <div className="bg-[#262154] h-screen w-[40%] rounded-r-md p-4  ">
      <h1 className="font-serif text-2xl text-center mt-10 text-white  ">
        Filter
      </h1>
      <div className="flex justify-around flex-wrap m-10 py-10 border-2 border-c rounded-lg border-whihite ">
        <input className="m-2 w-1/3 rounded-md" />
        <input className="m-2 w-1/3 rounded-md" />
        <button className="bg-green-400 mt-10 w-1/3 rounded-md"> click</button>
        <button className="bg-green-400 mt-10 w-1/3 rounded-md"> click</button>
      </div>
    </div>
  );
}

export default SideBar;
