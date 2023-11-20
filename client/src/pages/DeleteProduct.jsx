import React, { useEffect, useState } from "react";

import ArchiveProductList from "../components/DeleteProduct/ArchiveProductList";
import LastArchiveElementInput from "../components/DeleteProduct/UI/LastArchiveElementInput";
import PrintingUI from "../components/DeleteProduct/UI/PrintingUI";
import DismissProductList from "../components/DeleteProduct/DismissProductList";
import authAxios from "../service/axios";
import { useAuth } from "../contexts/AuthContext";
import HomeLoader from "../components/News/UI/HomeLoader";

const DeleteProduct = () => {
  const [productList, setProductList] = useState([{}]);
  const [dismissProductList, setDismissProductList] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [roomNumber, setRoomNumber] = useState("");
  const [customer, setCustomer] = useState("");
  const [inputText, setInputText] = useState("");
  const [selectEmployee, setSelectEmployee] = useState([]);
  const [options, setOptions] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // если меню открыто, то запрос

  let take = 5;
  let skip = 0;
  const includeZeroQuantity = false;

  const { user } = useAuth();

  const handleAllCustomers = async () => {
    try {
      const getAllCustomers = await authAxios.get("/product/allCustomers");
      setOptions(getAllCustomers.data.result);
    } catch (error) {
      console.error();
    }
  }; // Получение пользователя для select`a

  const inputTextHandler = async (e) => {
    let lowerCase = e.target.value.toLowerCase();
    if (!lowerCase) {
      return await handleFetchData();
    }
    setInputText(lowerCase);
    const searchedProducts = await authAxios.get(
      `/product/searchProducts?name=${lowerCase}&includeZeroQuantity=${includeZeroQuantity}`
    );
    setProductList(searchedProducts.data);
  }; // Поиск

  const handleFetchData = async () => {
    setIsLoading(true);
    setError(false);

    try {
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

  const handleDismissButton = (product) => {
    const idToRemove = product.id;
    setDismissProductList([...dismissProductList, product]);
    const updatedProductList = productList.filter(
      (product) => product.id !== idToRemove
    );
    setProductList(updatedProductList);
  };

  const handleReturnToArrayButton = (product) => {
    const idToRemove = product.id;
    setProductList([...productList, product]);
    const updatedProductList = dismissProductList.filter(
      (product) => product.id !== idToRemove
    );
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
        console.log(product.quantity);
        if (
          !product.quantity ||
          isNaN(product.quantity) ||
          product.quantity <= 0
        ) {
          return alert("Введите корректное количество для каждого товара");
        }
      }

      setFormLoading(true);
      setError(false);
      const formData = new FormData();
      const products = JSON.stringify(
        dismissProductList.map((product) => ({
          productId: product.id,
          productName: product.name, // название товара
          quantity: product.quantity, // количество на складе
          productDate: product.add_date, // дата добавления
          user: {
            userId: user.id,
            lastName: user.lastName,
            firstName: user.firstName,
            position: user.position,
            patronymic: user.patronymic,
          }, // пользователь
          roomNumber: roomNumber, // номер кабинета, кому выписывается товар
          customer: customer, // сотрудник которому выписывают товар
          issuingUsers: selectEmployee, // 2-е подписавшихся
        }))
      );
      formData.append("products", products);

      await authAxios.post("/product/delete", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setRoomNumber("");
      setCustomer("");
      setOptions("");
      setSelectEmployee("");
      setDismissProductList([]);
    } catch (error) {
    } finally {
      setFormLoading(false);
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
    if (!parseInt(enteredValue) !== 0) {
      const newDissmissProductList = [];
      for (const dp of dismissProductList) {
        if (dp.id !== id) newDissmissProductList.push({ ...dp });
        else newDissmissProductList.push({ ...dp, quantity: enteredValue });
      }
      setDismissProductList(newDissmissProductList);
    } else {
      alert("HAHHAH");
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    handleAllCustomers();
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div className="grid grid-cols-2 gap-5 place-items-center h-full p-10 uw:px-[700px] ">
          <div className="w-full  h-[500px] border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white rounded-lg ">
            <div className="h-full mx-5 flex flex-col">
              <LastArchiveElementInput inputTextHandler={inputTextHandler} />
              <ArchiveProductList
                productList={filteredProductList}
                handleDismissButton={handleDismissButton}
              />
            </div>
          </div>
          <div className="w-full  h-[500px]  border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white rounded-lg ">
            <div className="flex flex-col h-full ">
              <h1 className="font-myFont text-2xl mt-4 border-b border-gray-400 text-center mx-3">
                Выписать
              </h1>
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
      ) : (
        <HomeLoader />
      )}
    </div>
  );
};

export default DeleteProduct;
