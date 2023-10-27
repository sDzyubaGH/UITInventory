import React from "react";

function PrintingUI() {
  return (
    <div className="h-[470px] w-[600px] border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white">
      <div>
        <h1 className="text-center font-myFont text-2xl mt-4 ">Печать</h1>
      </div>
      <input
        type="text"
        className="mt-10 w-1/2 ml-5 h-10 pl-3 text-md font-myFont rounded-lg border-2 border-black shadow-lg focus:outline-none focus:shadow-orange-500 hover:shadow-orange-500"
        placeholder="Номер кабинета"
      />
      <input
        type="text"
        className="mt-4 w-1/2 ml-5 h-10 pl-3 text-md font-myFont rounded-lg border-2 border-black shadow-lg focus:outline-none focus:shadow-orange-500 hover:shadow-orange-500"
        placeholder="Сотрудник"
      />
      <div className="border-t  border-gray-500 my-3">
        <h2 className="text-xl font-myFont ml-4 mt-2">Подписанты</h2>
      </div>
      <select
        className="mt-2 w-1/2 ml-5 h-10 pl-3 text-md font-myFont rounded-lg border-2 border-black shadow-lg focus:outline-none  hover:shadow-orange-500 bg-white"
        placeholder="Сотрудник-1"
      >
        <option>Сотрудник</option>
        <option>Сотрудник</option>
      </select>

      <select
        className="mt-3 w-1/2 ml-5 h-10 pl-3 text-md font-myFont rounded-lg border-2 border-black shadow-lg focus:outline-none  hover:shadow-orange-500 bg-white"
        placeholder="Сотрудник-1"
      >
        <option>Сотрудник</option>
        <option>Сотрудник</option>
      </select>
      <div className="mt-10 text-center mx-24">
        <button className="w-full border-2 border-indigo-600 shadow-indigo-600 bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-400 h-12 rounded-xl text-lg font-myFont shadow-lg focus:outline-none ">
          Печать
        </button>
      </div>
    </div>
  );
}

export default PrintingUI;
