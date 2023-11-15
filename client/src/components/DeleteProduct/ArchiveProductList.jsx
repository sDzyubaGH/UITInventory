import React from "react";
import ArchiveProductItem from "./ArchiveProductItem";

export default function ArchiveProductList({
  productList,
  handleDismissButton,
}) {
  return (
    <div className="flex flex-col mt-12 px-14 gap-y-6 overflow-auto mb-5 ">
      {productList.length ? (
        productList.map((product, id) => (
          <ArchiveProductItem
            product={product}
            key={id}
            handleDismissButton={handleDismissButton}
          />
        ))
      ) : (
        <p className="text-center text-2xl font-myFont">Не обнаружено</p>
      )}
    </div>
  );
}
