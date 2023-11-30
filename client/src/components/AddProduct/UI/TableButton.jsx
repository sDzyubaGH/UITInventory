import React from "react";

function TableButton({ handleAddProductField, handleDeleteProductField }) {
  return (
    <div className="max-w-fit ml-5">
      <button
        className="group relative inline-block text-sm font-semibold text-indigo-600     "
        type="button"
        onClick={handleAddProductField}
      >
        <span className="rounded absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0  "></span>
        <span className="rounded relative block border border-current bg-white px-10 py-2 active:bg-indigo-600 active:text-white ">
          Добавить строку
        </span>
      </button>

      <button
        className="group relative inline-block text-sm font-semibold text-indigo-600 ml-[100px]   "
        type="button"
        onClick={handleDeleteProductField}
      >
        <span className="rounded absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0  "></span>
        <span className="rounded relative block border border-current bg-white px-10 py-2 active:bg-indigo-600 active:text-white ">
          Удалить все
        </span>
      </button>
    </div>
  );
}

export default TableButton;
