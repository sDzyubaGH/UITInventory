import React from "react";
import DismissProductItem from "./DismissProductItem";

function DismissProductList({ dismissProductList }) {
  console.log(dismissProductList);

  return (
    <div className="flex flex-col mt-5 px-5 gap-y-6 overflow-auto mb-5">
      {dismissProductList.length ? (
        dismissProductList.map((product) => (
          <DismissProductItem product={product} key={product.id} />
        ))
      ) : (
        <p className="text-center text-2xl font-myFont">Добавьте товар</p>
      )}
    </div>
  );
}

export default DismissProductList;
