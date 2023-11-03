import React, { useEffect, useState, useMemo } from "react";

import ArchiveProductList from "../components/DeleteProduct/ArchiveProductList";
import LastArchiveElementInput from "../components/DeleteProduct/UI/LastArchiveElementInput";
import PrintingUI from "../components/DeleteProduct/UI/PrintingUI";
import DismissProductList from "../components/DeleteProduct/DismissProductList";
import authAxios from "../service/axios";

const DeleteProduct = () => {
  const [productList, setProductList] = useState([{}]);
  const [dismissProductList, setDismissProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);

  let take = 5;
  let skip = 0;

  // Поиск
  const [inputText, setInputText] = useState("");

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
  };

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
    // !dismissProductList.some((dismissed) => dismissed.id === product.id)
  });

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 grid-flow-row items-center h-screen justify-items-center mx-10 ">
      <PrintingUI />
      <div className="w-4/5 h-[700px] border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white">
        <div className="h-full mx-5 flex flex-col">
          <LastArchiveElementInput inputTextHandler={inputTextHandler} />
          <ArchiveProductList
            productList={filteredProductList}
            handleDismissButton={handleDismissButton}
          />
        </div>
      </div>
      <div className=" w-4/5  border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white mr-auto">
        <h1 className="font-myFont text-2xl mt-4 border-b border-gray-400 text-center mx-3">
          Выписать
        </h1>
        <div className="h-[700px] mx-5 flex flex-col">
          <DismissProductList dismissProductList={dismissProductList} />
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
