import React, { useEffect, useState } from "react";

import ArchiveProductList from "../components/DeleteProduct/ArchiveProductList";
import LastArchiveElementInput from "../components/DeleteProduct/UI/LastArchiveElementInput";
import PrintingUI from "../components/DeleteProduct/UI/PrintingUI";
import DismissProductList from "../components/DeleteProduct/DismissProductList";
import authAxios from "../service/axios";
import { useAuth } from "../contexts/AuthContext";

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
  const options = [
    {
      value: "Омельченко С.А.",
      label: "Омельченко С.А.",
    },
    {
      value: "Дзюба С.А.",
      label: "Дзюба С.А.",
    },
    {
      value: "Созыкин И.М.",
      label: "Созыкин И.М.",
    },
    {
      value: "Ботвиненко Д.С.",
      label: "Ботвиненко Д.С.",
    },
  ];

  let take = 5;
  let skip = 0;

  const { user } = useAuth();

  const inputTextHandler = async (e) => {
    let lowerCase = e.target.value.toLowerCase();
    if (!lowerCase) {
      return await handleFetchData();
    }
    setInputText(lowerCase);
    const searchedProducts = await authAxios.get(
      `/product/searchProducts?name=${lowerCase}`
    );
    setProductList(searchedProducts.data);
  }; // Поиск

  const handleFetchData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await authAxios.get(
        `/product/allProduct?take=${take}&skip=${skip}`
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
      setFormLoading(true);
      setError(false);
      const formData = new FormData();
      const products = JSON.stringify(
        dismissProductList.map((product) => ({
          productName: product.name,
          quantity: product.quantity,
          productDate: product.add_date,
          userId: user.id,
          roomNumber: roomNumber,
          customer: customer,
        }))
      );
      formData.append("products", products);
      await authAxios.post("/product/delete", formData);
      selectEmployee("");
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

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
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
      <div className="w-full    h-[500px]  border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white rounded-lg ">
        <div className="mx-5 flex flex-col h-full ">
          <h1 className="font-myFont text-2xl mt-4 border-b border-gray-400 text-center mx-3">
            Выписать
          </h1>
          <DismissProductList dismissProductList={dismissProductList} />
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
  );
};

export default DeleteProduct;
