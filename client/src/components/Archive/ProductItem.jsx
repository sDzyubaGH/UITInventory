import React from "react";

function ProductItem({ prodItem, id }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg h-12 px-5 w-auto">
      <div className="overflow-auto max-h-12 ">
        <p className="break-words w-auto ">
          {prodItem.fullProduct.productName}
        </p>
      </div>
      <p>{prodItem.fullProduct.productQuantity}</p>
      <p>{prodItem.fullProduct.productAddDate}</p>
    </div>
  );
}

export default ProductItem;
// flex justify-between items-center  h-10 rounded-md px-8 bg-white mt-8 mb-5 shadow-lg
