import React from "react";

function ProductItem({ prodItem }) {
  console.log(prodItem);
  return (
    <div className="flex flex-col  justify-between rounded-lg  px-5 w-[600px]  font-myFont text-lg border-indigo-300 border-2 border-solid shadow-lg hover:border-indigo-500 hover:shadow-indigo-400">
      <h1 className="overflow-auto border-b border-b-black max-h-20">{prodItem.name}</h1>
      <div className="flex justify-around my-5">
        <p>{prodItem.customerFullName}</p>
        <div>
          {prodItem.quantity === 0 ? <p className="font-myFont text-red-600">Нет в наличии</p> : prodItem.quantity}
        </div>
        <p>{prodItem.add_date}</p>
      </div>
    </div>
  );
}

export default ProductItem;
