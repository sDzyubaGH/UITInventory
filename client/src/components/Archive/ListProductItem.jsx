import React from "react";
import ProductItem from "./ProductItem";

function ListProductItem({ allProduct }) {
  return (
    <div className="flex flex-col my-10 space-y-4  ">
      {allProduct.map((prodItem) => (
        <ProductItem prodItem={prodItem} />
      ))}
    </div>
  );
}

export default ListProductItem;
