import React from "react";
import DismissProductItem from "./DismissProductItem";

export default function DismissProductList({ productList }) {
  return (
    <div className="flex flex-col mt-14 px-5 gap-y-6 overflow-auto mb-5 ">
      {productList.length ? (
        productList.map((product, id) => (
          <DismissProductItem product={product} key={id} />
        ))
      ) : (
        <p className="text-center text-2xl font-myFont">Не обнаружено</p>
      )}
    </div>
  );
}
