import React from "react";

function DismissProductItem({ product, id }) {
  console.log(product);
  return (
    <div className="flex flex-col justify-between px-5 border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont ">
      <h1 className="overflow-auto border-b border-b-black">{product.name}</h1>
      <div className="flex justify-around">
        <p>{product.addDate}</p>
        <p>{product.customerFullName}</p>
        <p>{product.quantity}</p>
      </div>
    </div>
  );
}

export default DismissProductItem;
