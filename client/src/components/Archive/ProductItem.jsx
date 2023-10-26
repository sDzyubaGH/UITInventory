import React from "react";

function ProductItem({ prodItem }) {
  return (
    <div className="flex flex-col  justify-between rounded-lg  px-5 w-[600px]  font-myFont text-lg border-indigo-300 border-2 border-solid shadow-lg hover:border-indigo-500 hover:shadow-indigo-400">
      <h1 className="overflow-auto border-b border-b-black max-h-20">
        {prodItem.productName}
      </h1>
      <div className="flex justify-around mt-2">
        <p>{prodItem.customerFullName}</p>
        <p>{prodItem.productQuantity}</p>
        <p>{prodItem.productAddDate}</p>
      </div>
    </div>
  );
}

export default ProductItem;
