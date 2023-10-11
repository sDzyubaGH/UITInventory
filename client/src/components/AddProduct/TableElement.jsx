import React from "react";

function TableElement({ product, index, handleInputChange }) {
  return (
    <div>
      <input
        type="text"
        name="productName"
        className="border-indigo-300 border-2 w-2/4 h-12 shadow-md p-4  focus:outline-none hover:shadow-indigo-400"
        placeholder="Введите наименование товара"
        value={product.productName}
        onChange={(event) => {
          handleInputChange(index, event);
        }}
      />
      <input
        type="number"
        name="quantity"
        className="w-[120px] h-12 border-2 border-gray-300 ml-6 rounded-lg focus:outline-none p-4 hover:border-slate-400"
        placeholder="Кол-во"
        value={product.quantity}
        onChange={(event) => {
          handleInputChange(index, event);
        }}
      />
    </div>
  );
}

export default TableElement;
