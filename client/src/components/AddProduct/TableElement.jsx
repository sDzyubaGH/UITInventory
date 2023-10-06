import React from "react";

function TableElement() {
  return (
    <div className=" ">
      <input
        type="text"
        className="border-indigo-300 border-2 w-2/4 h-12 shadow-md shadow-indigo-400 focus:outline-none p-4"
      />
      <input
        type="text"
        className="w-auto h-12 border-2 border-gray-300 ml-6 rounded-lg focus:outline-none p-4 "
      />
    </div>
  );
}

export default TableElement;
