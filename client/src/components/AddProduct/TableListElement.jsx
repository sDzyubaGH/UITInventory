import React from "react";
import TableElement from "./TableElement";

function TableListElement({ productList, handleInputChange }) {
  return (
    <div className="space-y-3">
      {productList.map((product, index) => (
        <TableElement
          product={product}
          index={index}
          handleInputChange={handleInputChange}
        />
      ))}
    </div>
  );
}

export default TableListElement;
