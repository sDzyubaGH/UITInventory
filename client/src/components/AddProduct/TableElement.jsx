import { useEffect } from "react";

function TableElement({
  productName,
  quantity,
  setProductName,
  setQuantity,
  post,
}) {
  const handleKey = (e) => {
    const keyCode = e.keyCode || e.which;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 8) {
      e.preventDefault();
    }
  };
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleProdName = (event) => {
    setProductName(event.target.value);
  };

  useEffect(() => {}, []);

  console.log(quantity);
  console.log(productName);

  return (
    <div className=" ">
      <input
        type="text"
        className="border-indigo-300 border-2 w-2/4 h-12 shadow-md p-4  focus:outline-none hover:shadow-indigo-400"
        placeholder="Введите наименование товара"
        value={productName}
        onChange={handleProdName}
      />
      <input
        type="number"
        className="w-[120px] h-12 border-2 border-gray-300 ml-6 rounded-lg focus:outline-none p-4 hover:border-slate-400"
        placeholder="Кол-во"
        onKeyDown={handleKey}
        value={quantity}
        onChange={handleQuantity}
      />
    </div>
  );
}

export default TableElement;
