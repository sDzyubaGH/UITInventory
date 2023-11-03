import React from "react";
import { useState } from "react";
import authAxios from "../service/axios";
import TableListElement from "../components/AddProduct/TableListElement";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";
import TableButton from "../components/AddProduct/UI/TableButton";
import FileProduct from "../components/AddProduct/FileProduct";

function AddProduct() {
  const [productList, setProductList] = useState([
    { id: uuidv4(), productName: "", quantity: "" },
  ]);
  const [formLoading, setFormLoading] = useState(false);

  const { user } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState(null);

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
      const formData = new FormData();
      formData.append("file", selectedFiles);

      for (const product of productList) {
        await authAxios.post("/product/addProduct", {
          productName: product.productName,
          quantity: parseInt(product.quantity),
          userId: user.id,
          formData,
        });
      }
      setProductList([{ id: uuidv4(), productName: "", quantity: "" }]); // Очищаем форму после отправки данных
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

  const handleChange = (e) => {
    console.log(e.target.files);
    setSelectedFiles(e.target.files[0]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form
        className="flex flex-col  h-[600px] w-[1378px] border-2 p-5  bg-white rounded-xl shadow-xl shadow-indigo-300"
        onSubmit={handleFormSumbit}
      >
        <h1 className="text-center mb-6 text-xl font-myFont ">
          Добавить товар на склад
        </h1>
        {/* Элементы Таблицы */}
        <div className="mt-5 mb-10 w-[1000px] overflow-y-scroll h-[216px] ">
          <TableListElement
            productList={productList}
            handleInputChange={handleInputChange}
            deleteProduct={deleteProduct}
          />
        </div>
        {/* Добавление Элемента */}
        <TableButton
          handleAddProductField={handleAddProductField}
          handleDeleteProductField={handleDeleteProductField}
        />
        {/* Добавление файла */}
        <FileProduct handleChange={handleChange} />
        {/* Отправка формы */}
        <div className="ml-auto">
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
