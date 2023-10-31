import React from "react";
import { IoArrowRedoCircleSharp } from "react-icons/io5";

function ArchiveProductItem({ product, handleDismissButton }) {
  return (
    <div className="flex flex-col justify-between px-5 border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont ">
      <h1 className="overflow-auto border-b border-b-black ">{product.name}</h1>
      <div className="flex justify-around ">
        <p>{product.add_date}</p>
        <p>{product.customerFullName}</p>
        <p>{product.quantity}</p>
      </div>
      <div className="text-center text-orange-600 h-min">
        <button>
          <IoArrowRedoCircleSharp
            className="h-7 w-7"
            onClick={() => handleDismissButton(product)}
          />
        </button>
      </div>
    </div>
  );
}

export default ArchiveProductItem;
