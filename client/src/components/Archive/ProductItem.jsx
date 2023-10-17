import React from "react";

function ProductItem({ prodItem, id }) {
  return (
    <div className="flex items-center justify-between rounded-lg h-20 px-5 w-[600px] font-myFont text-lg border-indigo-300 border-2 border-solid hover:border-indigo-500 hover:shadow-indigo-400">
      <div className="overflow-auto break-words w-28 max-h-10">
        {prodItem.productName}
      </div>
      <p>{prodItem.productQuantity}</p>
      <p>{prodItem.productAddDate}</p>
    </div>
  );
}

export default ProductItem;
