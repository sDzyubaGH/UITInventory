import React, { useEffect } from "react";
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
  const [selectedFiles, setSelectedFiles] = useState(null);
  const { user } = useAuth();

  const handleFormSumbit = async (e) => {
    try {
      e.preventDefault();
      for (const product of productList) {
        if (!product.productName.trim() || !product.quantity.trim()) {
          return alert("поля не заполнены");
        }
      }
      setFormLoading(true);
      const products = JSON.stringify(
        productList.map((p) => ({
          productName: p.productName,
          quantity: p.quantity,
          userId: user.id,
        }))
      );

      const formData = new FormData();
      formData.append("products", products);
      for (const file of selectedFiles) {
        formData.append("files", file);
      }
      await authAxios.post("/product/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProductList([{ id: uuidv4(), productName: "", quantity: "" }]); // Очищаем форму после отправки данных
    } catch (error) {
      console.error("Ошибка при отправке", error);
    } finally {
      setFormLoading(false);
    }
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
    setSelectedFiles(e.target.files);
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
        <FileProduct
          handleChange={handleChange}
          selectedFiles={selectedFiles}
        />
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
