import React, { useEffect, useState } from "react";
import TableElement from "../components/AddProduct/TableElement";
import authAxios from "../service/axios";

const AddProduct = () => {
  const [formLoading, setFormLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productList, setProductList] = useState([{ productName, quantity }]);

  const handleAddProductLine = (event) => {
    event.preventDefault();
    setProductList((prevProductList) => [...prevProductList, {}]);
  };

  const handleFormSumbit = async (event) => {
    event.preventDefault();
    console.log(quantity);
    setFormLoading(true);
    try {
      const response = await authAxios.post(
        "http://localhost:8000/api/product/addProduct",
        { name: productName, quantity }
      );
      console.log("Product added:", response.data);
    } catch (error) {
      error;
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        className="flex flex-col  h-[600px] w-[1378px] border-2  p-10 shadow-lg shadow-slate-500"
        onSubmit={handleFormSumbit}
      >
        <h1 className="text-center mb-6 text-xl font-medium ">
          Добавить товар на склад
        </h1>
        {/* Элементы Таблицы */}

        <div className=" space-y-6 mb-6 overflow-hidden hover:overflow-auto h-[216px]">
          {productList.map((post, index) => (
            <TableElement
              key={index}
              productName={productName}
              quantity={quantity}
              setProductName={setProductName}
              setQuantity={setQuantity}
            />
          ))}
        </div>
        {/* Добавление Элемента */}
        <div className="">
          <button
            className="group relative inline-block text-sm font-semibold text-indigo-600   "
            type="button"
            onClick={handleAddProductLine}
          >
            <span className="rounded absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0  "></span>
            <span className="rounded relative block border border-current bg-white px-10 py-2 active:bg-indigo-600 active:text-white ">
              Добавить строку
            </span>
          </button>
        </div>
        {/* Добавление файла */}
        {/* <div className="relative inline-block mt-14">
          <label className="cursor-pointer px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded ">
            Выберите файл
          </label>
          <input
            id="file-input"
            type="file"
            name="file[]"
            multiple
            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
          />
        </div> */}
        {/* Отправка формы */}
        <div className=" ml-auto mt-20  ">
          <button
            type="submit"
            className=" inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none  active:bg-indigo-500"
          >
            Загрузить
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
