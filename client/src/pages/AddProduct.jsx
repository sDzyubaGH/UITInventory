import React from "react";
import { useState } from "react";
import authAxios from "../service/axios";
import TableListElement from "../components/AddProduct/TableListElement";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";

function AddProduct() {
  const [productList, setProductList] = useState([
    { id: uuidv4(), productName: "", quantity: "" },
  ]);
  const [formLoading, setFormLoading] = useState(false);

  const { user } = useAuth();

  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    const updatedProductList = productList.map((product) => {
      if (product.id === id) {
        return { ...product, [name]: value };
      }
      return product;
    });
    setProductList(updatedProductList);
  };

  const handleFormSumbit = async (e) => {
    try {
      e.preventDefault();
      setFormLoading(true);
      for (const product of productList) {
        await authAxios.post("http://localhost:8000/api/product/addProduct", {
          name: product.productName,
          quantity: parseInt(product.quantity),
          userId: Number(parseInt(user)),
        });
      }
      setProductList([{ id: uuidv4(), productName: "", quantity: "" }]); // Очищаем форму после отправки данных
      console.log("Product add");
    } catch (error) {
      console.error("Ошибка при отправке", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleAddProductField = () => {
    setProductList([
      ...productList,
      { id: uuidv4(), productName: "", quantity: "" },
    ]);
  };

  const handleDeleteProductField = (id) => {
    setProductList([{ productName: "", quantity: "" }]); // Удаление из массива
  };

  const deleteProduct = (id) => {
    if (productList.length === 1) return;
    let buf = [...productList];
    for (let i = 0; i < buf.length; i++) {
      if (buf[i].id === id) {
        buf.splice(i, 1);
        break;
      }
    }
    setProductList(buf);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        className="flex flex-col  h-[600px] w-[1378px] border-2 p-10  bg-white rounded-xl shadow-xl shadow-indigo-300"
        onSubmit={handleFormSumbit}
      >
        <h1 className="text-center mb-6 text-xl font-myFont ">
          Добавить товар на склад
        </h1>
        {/* Элементы Таблицы */}
        <div className=" m-auto w-[1000px] overflow-y-scroll h-[216px] ">
          <TableListElement
            productList={productList}
            handleInputChange={handleInputChange}
            deleteProduct={deleteProduct}
          />
        </div>
        {/* Добавление Элемента */}
        <div className="">
          <button
            className="group relative inline-block text-sm font-semibold text-indigo-600     "
            type="button"
            onClick={handleAddProductField}
          >
            <span className="rounded absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0  "></span>
            <span className="rounded relative block border border-current bg-white px-10 py-2 active:bg-indigo-600 active:text-white ">
              Добавить строку
            </span>
          </button>

          <button
            className="group relative inline-block text-sm font-semibold text-indigo-600 ml-[100px]   "
            type="button"
            onClick={handleDeleteProductField}
          >
            <span className="rounded absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0  "></span>
            <span className="rounded relative block border border-current bg-white px-10 py-2 active:bg-indigo-600 active:text-white ">
              Удалить все
            </span>
          </button>
        </div>
        {/* Добавление файла */}
        {/* <div className="">
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
        <div className="ml-auto mt-20">
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
}

export default AddProduct;
