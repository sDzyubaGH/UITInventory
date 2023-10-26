import React, { useEffect, useState } from "react";

import DismissProductList from "../components/DeleteProduct/DismissProductList";
import LastArchiveElementInput from "../components/DeleteProduct/UI/LastArchiveElementInput";
import PrintingUI from "../components/DeleteProduct/UI/PrintingUI";
import DismissUI from "../components/DeleteProduct/UI/DismissUI";
import authAxios from "../service/axios";

const DeleteProduct = () => {
  const [productList, setProductList] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  // Поиск
  const [inputText, setInputText] = useState("");

  const inputTextHandler = async (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    const searchedProducts = (
      await authAxios.get(`/product/searchProducts?name=${lowerCase}`)
    ).data;
    setProductList(searchedProducts);
  };

  let take = 5;
  let skip = 0;

  const handleFetchData = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await authAxios.get(
        `/product/allProduct?take=${take}&skip=${skip}`
      );

      const getArchiveProduct = response.data.map((action) => {
        console.log(action);
        const toTransform = new Date(action.product.add_date);
        const formattedDate = `${toTransform.getUTCDate()}.${
          toTransform.getUTCMonth() + 1
        }.${toTransform.getUTCFullYear()}`;

        const archiveProduct = {
          id: action.product.id,
          customerFullName: action.user.firstName + " " + action.user.surname,
          name: action.product.name,
          quantity: action.product.quantity,
          addDate: formattedDate,
        };

        return archiveProduct;
      });
      console.log(getArchiveProduct);
      setProductList(getArchiveProduct);
    } catch (error) {
      setError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 grid-flow-row items-center h-screen justify-items-center ">
      <PrintingUI />
      <div className="w-4/5 h-[700px] border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white">
        <div className="h-full mx-5 flex flex-col">
          <LastArchiveElementInput
            inputTextHandler={inputTextHandler}
            inputText={inputText}
          />
          <DismissProductList productList={productList} inputText={inputText} />
        </div>
      </div>
      <div className=" w-4/5 h-[700px] border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white mr-auto">
        <DismissUI />
      </div>
    </div>
  );
};

export default DeleteProduct;
