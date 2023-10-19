import React from "react";
import ProductItem from "./ProductItem.jsx";

function ListProductItem({ allProduct }) {
  return (
    <div className="flex flex-col mt-10 mb-5 space-y-4   ">
      {allProduct.map((prodItem, i) => (
        <ProductItem key={prodItem.id} prodItem={prodItem} />
      ))}
    </div>
  );
}

export default ListProductItem;
