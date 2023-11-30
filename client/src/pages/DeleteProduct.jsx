import React, { useEffect, useState } from "react";
import ArchiveProductList from "../components/DeleteProduct/ArchiveProductList";
import LastArchiveElementInput from "../components/DeleteProduct/UI/LastArchiveElementInput";
import PrintingUI from "../components/DeleteProduct/UI/PrintingUI";
import DismissProductList from "../components/DeleteProduct/DismissProductList";
import authAxios from "../service/axios";
import { useAuth } from "../contexts/AuthContext";
import ProductDismissAlert from "../components/DeleteProduct/ProductDismissAlert";

const DeleteProduct = () => {
  const [productList, setProductList] = useState([{}]);
  const [dismissProductList, setDismissProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roomNumber, setRoomNumber] = useState("");
  const [customer, setCustomer] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectEmployee, setSelectEmployee] = useState([]);
  const [options, setOptions] = useState("");

  let take = 5;
  let skip = 0;
  const includeZeroQuantity = false;

  const { user } = useAuth();
  // Получение пользователя для select`a
  const handleAllCustomers = async () => {
    try {
      const getAllCustomers = await authAxios.get("/product/allCustomers");
      const filteredCustomers = getAllCustomers.data.result.filter((customer) => customer.userId !== user.id);

      setOptions(filteredCustomers);
    } catch (error) {
      console.error();
      setError(true);
    }
  };

  // Поиск
  const inputTextHandler = async (e) => {
    try {
      e.preventDefault();
      setError(false);
      let lowerCase = e.target.value.toLowerCase();
      if (!lowerCase) {
        return await handleFetchData();
      }
      setInputText(lowerCase);
      const searchedProducts = await authAxios.get(
        `/product/searchProducts?name=${lowerCase}&includeZeroQuantity=${includeZeroQuantity}`
      );
      setProductList(searchedProducts.data);
    } catch (error) {
      console.error();
      setError(true);
    }
  };

  const handleFetchData = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await authAxios.get(
        `/product/allProduct?take=${take}&skip=${skip}&includeZeroQuantity=${includeZeroQuantity}`
      );
      const getArchiveProduct = response.data;
      setProductList(getArchiveProduct);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProductList = async () => {
    try {
      const response = await authAxios.get(
        `/product/allProduct?take=${take}&skip=${skip}&includeZeroQuantity=${includeZeroQuantity}`
      );
      const updatedProductList = response.data;
      setProductList(updatedProductList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDismissButton = (product) => {
    const idToRemove = product.id;
    setDismissProductList([...dismissProductList, product]);
    const updatedProductList = productList.filter((product) => product.id !== idToRemove);
    setProductList(updatedProductList);
  };

  const handleReturnToArrayButton = (product) => {
    const idToRemove = product.id;
    setProductList([...productList, product]);
    const updatedProductList = dismissProductList.filter((product) => product.id !== idToRemove);
    setDismissProductList(updatedProductList);
  };

  const filteredProductList = productList.filter((product) => {
    for (const dProduct of dismissProductList) {
      if (dProduct.id === product.id) {
        return false;
      }
    }
    return true;
  });

  const handleFormSumbit = async (e) => {
    try {
      e.preventDefault();
      if (!roomNumber.trim() || !customer.trim() || !selectEmployee) {
        return alert("Поля не заполнены");
      } else if (selectEmployee.length < 2) {
        return alert("Выберите еще одного сотрудника для подписи");
      }

      if (dismissProductList.length === 0) {
        return alert("Добавьте товары для выписки");
      }

      for (const product of dismissProductList) {
        if (!product.quantity || isNaN(product.quantity) || product.quantity <= 0) {
          return alert("Введите корректное количество для каждого товара");
        }
      }

      setIsLoading(true);
      setError(false);

      const formData = new FormData();
      const products = dismissProductList.map((product) => ({
        productId: product.id,
        productName: product.name, // название товара
        quantity: product.quantity, // количество на складе
        productDate: product.add_date, // дата добавления
      }));
      const formDataUser = {
        userId: user.id,
        customerFullName: `${user.lastName} ${user.firstName.slice(0, 1)}${"." + user?.patronymic.slice(0, 1) + "."}`,
        position: user.position,
      }; // пользователь

      formData.append("roomNumber", roomNumber); // roomNumber: roomNumber, // номер кабинета, кому выписывается товар
      formData.append("customer", customer); // customer: customer, // сотрудник которому выписывают товар
      formData.append("issuingUsers", JSON.stringify(selectEmployee)); // issuingUsers: selectEmployee, // 2-е подписавшихся
      formData.append("products", JSON.stringify(products));
      formData.append("user", JSON.stringify(formDataUser));

      const response = await authAxios.post("/product/delete", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });
      // Загрузка файла с сервера
      const href = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      link.download = "output.docx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      //Сброс полей ввода
      setRoomNumber("");
      setCustomer("");
      setDismissProductList("");
      await updateProductList();
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setTimeout(() => setIsLoading(false), 3000);
    }
  }; // Отправка данных на сервер для печати

  const handleRoomNumber = (e) => {
    const targetRoomNumber = e.target.value;
    setRoomNumber(targetRoomNumber);
  }; //Номер кабинета

  const handleCustomer = (e) => {
    const targetCustomer = e.target.value;
    setCustomer(targetCustomer);
  }; // Сотрудник которому выписывают

  const handleSelectedEmployees = (selectedOptions) => {
    setSelectEmployee(selectedOptions);
  }; // Выбранные сотрдуники

  const isOptionDisabled = (option) => {
    return selectEmployee.length >= 2 && !selectEmployee.includes(option);
  }; // Ограничение выбора до 2-х сотрудников

  const handleChangeProductQuantity = (id, enteredValue) => {
    const newDissmissProductList = [];
    for (const dp of dismissProductList) {
      if (dp.id !== id) newDissmissProductList.push({ ...dp });
      else newDissmissProductList.push({ ...dp, quantity: enteredValue });
    }
    setDismissProductList(newDissmissProductList);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    handleAllCustomers();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-5 place-items-center h-full p-10 uw:px-[700px] ">
        <div className="w-full  h-[500px] border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white rounded-lg ">
          <div className="h-full mx-5 flex flex-col">
            <LastArchiveElementInput inputTextHandler={inputTextHandler} />
            <ArchiveProductList productList={filteredProductList} handleDismissButton={handleDismissButton} />
          </div>
        </div>
        <div className="w-full  h-[500px]  border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white rounded-lg ">
          <div className="flex flex-col h-full ">
            <h1 className="font-myFont text-2xl mt-4 border-b border-gray-400 text-center mx-3">Выписать</h1>
            <DismissProductList
              dismissProductList={dismissProductList}
              handleReturnToArrayButton={handleReturnToArrayButton}
              handleChangeProductQuantity={handleChangeProductQuantity}
            />
          </div>
        </div>
        <PrintingUI
          handleRoomNumber={handleRoomNumber}
          handleCustomer={handleCustomer}
          roomNumber={roomNumber}
          customer={customer}
          handleSelectedEmployees={handleSelectedEmployees}
          options={options}
          selectEmploye={selectEmployee}
          isOptionDisabled={isOptionDisabled}
          handleFormSumbit={handleFormSumbit}
        />
      </div>
      {isLoading && (
        <div className="absolute bottom-[60px] left-[20px] animate-fade-up">
          <ProductDismissAlert />
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;
