import React from "react";
import Select from "react-select";

function PrintingUI({
  handleRoomNumber,
  handleCustomer,
  customer,
  roomNumber,
  handleSelectedEmployees,
  options,
  selectEmployee,
  handleFormSumbit,
  isOptionDisabled,
}) {
  console.log(options);
  return (
    <form className="w-9/12 px-10 max-w-4xl  col-span-2 py-5 text-center gap-2 rounded-lg items-center border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white min-w-min">
      <h1 className="text-center font-myFont text-2xl">Печать</h1>
      <div className="flex flex-wrap justify-center mt-5">
        <div className="w-1/2">
          <input
            type="text"
            className="h-11 pl-2 mb-2 text-md font-myFont rounded-md border-2 border-black shadow-lg focus:outline-none focus:shadow-orange-500 hover:shadow-orange-500"
            placeholder="Номер кабинета"
            value={roomNumber}
            onChange={handleRoomNumber}
            required
          />
          <input
            type="text"
            className="h-11 pl-2 mb-2 text-md font-myFont rounded-md border-2 border-black shadow-lg focus:outline-none focus:shadow-orange-500 hover:shadow-orange-500"
            onChange={handleCustomer}
            value={customer}
            placeholder="Сотрудник"
          />
        </div>

        <div className="w-1/2 px-2 ">
          <Select
            isMulti
            options={options}
            onChange={handleSelectedEmployees}
            value={selectEmployee}
            className="text-lg font-myFont rounded-lg shadow-lg hover:shadow-orange-500"
            placeholder="Выберите сотрудников"
            maxMenuHeight={120}
            isOptionDisabled={isOptionDisabled}
            isSearchable={true}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary50: "hotpink",
                primary: "black",
              },
            })}
            required
          />
        </div>
        <button
          className="w-full mx-20 max-w-3xl mt-5    bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-400 h-12 rounded-xl text-lg font-myFont shadow-lg focus:outline-none"
          onClick={handleFormSumbit}
        >
          Печать
        </button>
      </div>
    </form>
  );
}

export default PrintingUI;
