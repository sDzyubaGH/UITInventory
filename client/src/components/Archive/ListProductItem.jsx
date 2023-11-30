import React from "react";
import ProductItem from "./ProductItem.jsx";

function ListProductItem({ allProduct }) {
  console.log(allProduct);
  return (
    <div className="flex flex-col mt-10 mb-5 space-y-4   ">
      {allProduct.length > 0 ? (
        allProduct.map((prodItem) => <ProductItem key={prodItem.id} prodItem={prodItem} />)
      ) : (
        <></>
      )}
    </div>
  );
}

export default ListProductItem;
