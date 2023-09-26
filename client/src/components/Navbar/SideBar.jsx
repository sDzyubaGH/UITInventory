import React from "react";

function SideBar() {
  return (
    <div className="flex justify-center items-center w-96  mt-[122px] ml-2 mr-2">
      <div className="flex-wrap w-full max-w-6xl h-full border-indigo-300 border-2 bg-white ">
        <div className="flex  flex-col items-center content-between ">
          <p>Поиск</p>
          <input placeholder="take" className="bg-red-100" />
          <input className="bg-green-600" />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
