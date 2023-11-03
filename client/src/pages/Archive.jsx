import React, { useEffect, useMemo, useState } from "react";
import authAxios from "../service/axios.js";
import ListProductItem from "../components/Archive/ListProductItem";
import InfiniteScroll from "react-infinite-scroll-component";
import ArchiveInputs from "../components/Archive/UI/ArchiveInput.jsx";
import InfiniteScrollLoader from "../components/Archive/UI/InfiInfiniteScrollLoader.jsx";

const Archive = () => {
  //Оригинальный массив
  const [allProduct, setAllProduct] = useState([]);
  //Флаги состояния
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState(true);
  //Пагинация
  const [page, setPage] = useState(0);
  let take = 10;
  let skip = page * take;
  //Фильтрация
  const [inputSearchProduct, setInputSearchProduct] = useState("");
  const [inputSearchCustomer, setInputSearchCustomer] = useState("");
  const [dateRange, setDateRange] = useState(["", ""]);
  const [startDate, endDate] = dateRange;

  const handleFetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await authAxios.get(
        `/product/allProduct?take=${take}&skip=${skip}`
      );
      const fullProduct = response.data;
      setTimeout(() => {
        setHasMore(fullProduct.length > 0);
        setAllProduct((prevProduct) => {
          return [...prevProduct, ...fullProduct];
        });
        setPage((prevPage) => prevPage + 1);
      }, 500);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  //Поиск товара
  const handleSearchProduct = async (e) => {
    const product = e.target.value;
    setInputSearchProduct(product);
    const searchedProducts = await authAxios.get(
      `/product/searchProducts?name=${product}`
    );
    setAllProduct(searchedProducts.data);
    setHasMore(false);
  };

  //Поиск сотрудника
  const handleSearchCustomer = async (e) => {
    const customer = e.target.value;
    setInputSearchCustomer(customer);
    const searchedCustomers = await authAxios.get(
      `/product/searchCustomers?name=${customer}`
    );
    setAllProduct(searchedCustomers.data);
    setHasMore(false);
  };

  //Фильтр по дате
  const handleDateFilter = async (update) => {
    setDateRange(update);
    const [startDateTmp, endDateTmp] = update;

    const filteredDate = await authAxios.get(
      `/product/filterDate?startDate=${startDateTmp}&endDate=${endDateTmp}`
    );
    setAllProduct(filteredDate.data);
    setHasMore(false);
  };

  return (
    <div className="flex justify-center  min-h-screen">
      <div className="flex items-center flex-col border border-white my-10 px-10 rounded-xl min-w-max shadow-2xl shadow-indigo-600 bg-white ">
        <h1 className="mt-5 text-2xl font-myFont ">Архив</h1>
        <ArchiveInputs
          handleSearchProduct={handleSearchProduct}
          handleSearchCustomer={handleSearchCustomer}
          inputSearchProduct={inputSearchProduct}
          inputSearchCustomer={inputSearchCustomer}
          startDate={startDate}
          endDate={endDate}
          handleDateFilter={handleDateFilter}
        />

        <InfiniteScroll
          dataLength={allProduct.length}
          next={handleFetchData}
          hasMore={hasMore}
          loader={
            allProduct.length ? (
              <InfiniteScrollLoader />
            ) : (
              <p className="text-center text-xl font-myFont">Не обнаружено</p>
            )
          }
        >
          <ListProductItem allProduct={allProduct} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Archive;
