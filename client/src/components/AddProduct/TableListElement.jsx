import React from "react";
import TableElement from "./TableElement";

function TableListElement({ productList, handleInputChange, deleteProduct }) {
  return (
    <div className="space-y-3 ">
      {productList.map((product) => (
        <TableElement
          key={product.id}
          product={product}
          handleInputChange={handleInputChange}
          deleteProduct={deleteProduct}
        />
      ))}
    </div>
  );
}

export default TableListElement;
