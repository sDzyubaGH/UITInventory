import React from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
function LastArchiveElementInput({ inputTextHandler }) {
  return (
    <div>
      <h1 className="text-center font-myFont text-2xl mt-4 border-b border-gray-400">Последние добавленные на склад</h1>
      <div className="relative px-2">
        <IoSearchCircleSharp className="absolute top-2 left-3 text-indigo-500 mt-10 text-3xl" />
        <input
          className="mt-10 w-full h-12 rounded-md border-2 border-black  shadow-xl focus:outline-none pl-9 text-xl font-myFont focus:shadow-orange-500 hover:shadow-orange-500"
          type="text"
          placeholder="Найти товар...."
          onChange={inputTextHandler}
        />
      </div>
    </div>
  );
}

export default LastArchiveElementInput;
