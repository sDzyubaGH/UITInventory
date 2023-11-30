import React from "react";
import { useState } from "react";
import authAxios from "../service/axios";
import TableListElement from "../components/AddProduct/TableListElement";
import TableButton from "../components/AddProduct/UI/TableButton";
import FileProductList from "../components/AddProduct/FileProductList";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../contexts/AuthContext";
import HomeLoader from "../components/News/UI/HomeLoader";
import { IoIosWarning } from "react-icons/io";

function AddProduct() {
  const [productList, setProductList] = useState([{ id: uuidv4(), productName: "", quantity: "" }]);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState("");
  const [error, setError] = useState(null);
  const [isMaxFileSize, setIsMaxFileSize] = useState([]);
  const { user } = useAuth();

  const handleFormSumbit = async (e) => {
    try {
      e.preventDefault();
      setFormLoading(true);
      for (const product of productList) {
        const quantityValue = product.quantity.trim();

        if (!product.productName.trim() || !quantityValue || isNaN(quantityValue) || parseInt(quantityValue, 10) < 0) {
          return alert("Поля не заполнены или введено некорректное количество");
        }
      }

      for (const file of selectedFiles) {
        if (file.size > 10 * 1024 * 1024) {
          return alert("Файл превышает заданный размер");
        }
      }

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

      const response = await authAxios.post("/product/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.message);
      setProductList([{ id: uuidv4(), productName: "", quantity: "" }]); // Очищаем форму после отправки данных
      setSelectedFiles("");
      setError("");
    } catch (error) {
      console.error("Ошибка при отправке", error);
      setError(error.response?.data?.message || error.message);
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
    const files = e.target.files;
    const errors = [];

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        const ERROR_FILE_MESSAGE = `Размер файла ${file.name} не может превышать 10МБ`;
        errors.push(ERROR_FILE_MESSAGE);
      }

      if (errors.length > 0) {
        setIsMaxFileSize(errors);
        setSelectedFiles([]); // Очищаем selectedFiles, так как есть недопустимые файлы
      } else {
        setSelectedFiles(files);
        setIsMaxFileSize([]);
      }
    }
  };

  const handleAddProductField = () => {
    setProductList([
      ...productList,
      { id: uuidv4(), productName: "", quantity: "" }, // Добавление в массив
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
    <div className="flex justify-center py-20 ">
      {!formLoading ? (
        <form className="flex flex-col w-[1378px] border-2 p-5  bg-white rounded-xl shadow-xl shadow-indigo-300">
          <h1 className="text-center mb-6 text-xl font-myFont ">Добавить товар на склад</h1>
          {/* Элементы Таблицы */}
          <div className="mt-5 mb-10 min-w-full overflow-y-scroll h-[216px] ">
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

          <FileProductList handleChange={handleChange} selectedFiles={selectedFiles} isMaxFileSize={isMaxFileSize} />
          {isMaxFileSize.length > 0 && (
            <p className="text-red-500 text-md font-myFont m-auto flex flex-wrap w-1/2 border rounded-lg p-2 border-red-500 ">
              {isMaxFileSize.map((errorFile, index) => (
                <div key={index} className="flex items-center">
                  <IoIosWarning className="mr-2" style={{ fontSize: "1.5rem" }} />
                  <span key={index}>{errorFile}</span>
                </div>
              ))}
            </p>
          )}

          {error && (
            <div className="flex">
              <p className="text-red-500 m-5 text-md font-myFont border border-red-500 w-1/4 p-2 rounded-lg text-center ">
                <IoIosWarning className="absolute " style={{ fontSize: "1.5rem" }} />
                {error}
              </p>
            </div>
          )}

          {/* Отправка формы */}
          <div className="ml-auto mt-5">
            <button
              type="submit"
              onClick={handleFormSumbit}
              className=" inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none  active:bg-indigo-500"
            >
              Загрузить
            </button>
          </div>
          {/* {setFormLoading && <div>{response?.data?.message}</div>} */}
        </form>
      ) : (
        <HomeLoader />
      )}
    </div>
  );
}

export default AddProduct;
