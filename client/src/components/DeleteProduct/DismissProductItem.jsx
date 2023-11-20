import React, { useMemo } from "react";
import { useState } from "react";
import { IoArrowUndoCircle } from "react-icons/io5";

function DismissProductItem({
  product,
  handleReturnToArrayButton,
  handleChangeProductQuantity,
}) {
  const maxQuantity = useMemo(() => product.quantity, []);
  const [value, setValue] = useState(maxQuantity);
  const [error, setError] = useState("");

  const changeQuantityHandler = (e) => {
    const enteredValue = e.target.value;
    if (enteredValue >= 1 && enteredValue <= maxQuantity) {
      console.log(enteredValue);
      setValue(enteredValue);
      handleChangeProductQuantity(product.id, enteredValue);
      setError("");
    } else {
      setValue("");
      setError("Введите число");
      //   handleChangeProductQuantity(product.id, "0");
    }
  };

  return (
    <div className="flex flex-col justify-between  border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont px-3 py-1 ">
      <h1 className="overflow-auto border-b border-b-black mb-2 ">
        {product.name}
      </h1>
      <div className="flex justify-around  ">
        <p>{product.add_date}</p>
        <p>{product.customerFullName}</p>
        <div className="text-center font-myFont">
          <input
            className={`text-center w-20 px-2 py-1 border rounded-md focus:outline-none ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            onChange={changeQuantityHandler}
            value={value}
          />
          {error && <p className="text-red-500 text-sm ">{error}</p>}
        </div>
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
