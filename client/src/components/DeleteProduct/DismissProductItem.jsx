import React from "react";

function DismissProductItem({ product }) {
  return (
    <div className="flex flex-col justify-between  border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont px-3 py-1 ">
      <h1 className="overflow-auto border-b border-b-black ">{product.name}</h1>
      <div className="flex justify-around  ">
        <p>{product.add_date}</p>
        <p>{product.customerFullName}</p>
        <p>{product.quantity}</p>
      </div>
    </div>
  );
}

export default DismissProductItem;
