import React, { useMemo } from "react";
import { IoArrowUndoCircle } from "react-icons/io5";

function DismissProductItem({
  product,
  handleReturnToArrayButton,
  handleChangeProductQuantity,
}) {
  const maxQuantity = useMemo(() => product.quantity, []);

  const changeQuantityHandler = (e) => {
    handleChangeProductQuantity(product.id, e);
  };

  return (
    <div className="flex flex-col justify-between  border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont px-3 py-1 ">
      <h1 className="overflow-auto border-b border-b-black mb-2 ">
        {product.name}
      </h1>
      <div className="flex justify-around  ">
        <p>{product.add_date}</p>
        <p>{product.customerFullName}</p>
        <input
          className="text-center w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="number"
          onChange={changeQuantityHandler}
          defaultValue={product.quantity}
          min={1}
          max={maxQuantity}
        />
      </div>
      <div className="text-center text-orange-600 ">
        <button>
          <IoArrowUndoCircle
            className="h-7 w-7"
            onClick={() => handleReturnToArrayButton(product)}
          />
        </button>
      </div>
    </div>
  );
}

export default DismissProductItem;
