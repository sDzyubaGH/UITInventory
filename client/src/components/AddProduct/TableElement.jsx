import React, { useState } from "react";
import { TiDelete, TiDeleteOutline } from "react-icons/ti";

function TableElement({ product, handleInputChange, deleteProduct }) {
  const deleteProductHandler = () => {
    deleteProduct(product.id);
    setIsDeletingProduct((prevState) => !prevState);
  };

  const [isDeletingProduct, setIsDeletingProduct] = useState(false);

  return (
    <div className="animate-fade-right ">
      <button
        onMouseUp={deleteProductHandler}
        onMouseDown={() => setIsDeletingProduct((prevState) => !prevState)}
        onMouseLeave={() => setIsDeletingProduct(false)}
      >
        {isDeletingProduct ? (
          <TiDeleteOutline className="text-3xl text-center " />
        ) : (
          <TiDelete className="text-3xl text-center " />
        )}
      </button>
      <input
        type="text"
        name="productName"
        className="border-indigo-500 border-2 w-3/4 h-12 shadow-md p-4  focus:outline-none hover:shadow-indigo-400 "
        placeholder="Введите наименование товара"
        value={product.productName}
        onChange={(event) => {
          handleInputChange(product.id, event);
        }}
      />
      <input
        type="number"
        min="1"
        name="quantity"
        className="w-[120px] h-12 border-2 border-gray-300 ml-2 rounded-lg focus:outline-none p-4 hover:border-slate-400"
        placeholder="Кол-во"
        value={product.quantity}
        onChange={(event) => {
          handleInputChange(product.id, event);
        }}
      />
    </div>
  );
}

export default TableElement;
