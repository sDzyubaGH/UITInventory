import React from "react";
import DismissProductItem from "./DismissProductItem";
import { BsCardChecklist } from "react-icons/bs";

function DismissProductList({ dismissProductList }) {
  return (
    <div className="flex flex-col mt-5 px-5 gap-y-6 overflow-auto mb-5">
      {dismissProductList.length ? (
        dismissProductList.map((product) => (
          <DismissProductItem product={product} key={product.id} />
        ))
      ) : (
        <div className="text-xl font-myFont">
          <div className="flex items-center justify-center ">
            <BsCardChecklist className="text-indigo-600" />
            <p className="ml-2">Добавьте товар</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DismissProductList;
