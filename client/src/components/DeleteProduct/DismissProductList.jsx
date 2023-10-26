import React from "react";
import DismissProductItem from "./DismissProductItem";

export default function DismissProductList({ productList, inputText }) {
  const filteredData = productList.filter((e) => {
    if (inputText === "") {
      return e;
    } else {
      return e.name.toLowerCase().includes(inputText);
    }
  });
  return (
    <div className="flex flex-col mt-14 px-5 gap-y-6 overflow-auto mb-5 ">
      {filteredData.map((product, id) => (
        <DismissProductItem product={product} id={product.id} />
      ))}
    </div>
  );
}
