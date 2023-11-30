import React, { useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";

const ArchiveInputs = ({
  handleSearchProduct,
  handleSearchCustomer,
  inputSearchProduct,
  inputSearchCustomer,
  startDate,
  endDate,
  handleDateFilter,
}) => {
  return (
    <div className="mt-8 flex ">
      <div className="relative">
        <IoSearchCircleSharp className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 text-black" />
        <input
          type="text"
          className="bg-white h-9 rounded-lg pl-10 pr-3 border-orange-300 border-2 shadow-md focus:outline-none"
          placeholder="Поиск товара..."
          onChange={handleSearchProduct}
          value={inputSearchProduct}
        />
      </div>
      <div className="relative ml-2">
        <MdPersonSearch className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 text-black" />
        <input
          type="text"
          className="bg-white h-9 rounded-lg pl-10 pr-3 border-orange-300 border-2 shadow-md focus:outline-none"
          placeholder="Поиск сотрудника..."
          onChange={handleSearchCustomer}
          value={inputSearchCustomer}
        />
      </div>
      <div className="ml-2 bg-white">
        <DatePicker
          className="mr-[1px] h-9 rounded-lg border-orange-300 border-2 shadow-md focus:outline-none"
          showIcon
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateFilter}
          dateFormat="dd.MM.yyyy"
          placeholderText="Поиск по дате..."
          locale={ru}
        />
      </div>
    </div>
  );
};

export default ArchiveInputs;
