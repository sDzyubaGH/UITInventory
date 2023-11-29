import React, { useEffect, useState } from "react";
import authAxios from "../service/axios.js";
import ListProductItem from "../components/Archive/ListProductItem";
import InfiniteScroll from "react-infinite-scroll-component";
import ArchiveInputs from "../components/Archive/UI/ArchiveInput.jsx";
import InfiniteScrollLoader from "../components/Archive/UI/InfiInfiniteScrollLoader.jsx";
import HomeLoader from "../components/News/UI/HomeLoader.jsx";

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
  // const [dateRange, setDateRange] = useState(["", ""]);
  // const [startDate, endDate] = dateRange;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const includeZeroQuantity = true;

  const handleFetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await authAxios.get(
        `/product/allProduct?take=${take}&skip=${skip}&includeZeroQuantity=${includeZeroQuantity}`
      );
      const fullProduct = response.data;
      setHasMore(fullProduct.length > 0);
      setAllProduct((prevProduct) => {
        return [...prevProduct, ...fullProduct];
      });
      setPage((prevPage) => prevPage + 1);
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

  // //Поиск товара
  // const handleSearchProduct = async (e) => {
  //   const product = e.target.value;
  //   setInputSearchProduct(product);

  //   const params = new URLSearchParams();
  //   params.append("product", e.target.value);
  //   params.append("date", dateRange);
  //   params.append("employee", inputSearchCustomer);

  //   const searchedProducts = await authAxios.get(
  //     `/product/searchProducts?${params.toString()}`
  //   );
  //   setAllProduct(searchedProducts.data);
  //   setHasMore(false);
  //   setLoading(true);
  // };

  // //Поиск сотрудника
  // const handleSearchCustomer = async (e) => {
  //   const customer = e.target.value;
  //   setInputSearchCustomer(customer);
  //   const searchedCustomers = await authAxios.get(
  //     `/product/searchCustomers?name=${customer}`
  //   );
  //   setAllProduct(searchedCustomers.data);
  //   setHasMore(false);
  // };

  // //Фильтр по дате
  // const handleDateFilter = async (update) => {
  //   setDateRange(update);
  //   const [startDateTmp, endDateTmp] = update;
  //   const filteredDate = await authAxios.get(
  //     `/product/filterDate?startDate=${startDateTmp}&endDate=${endDateTmp}`
  //   );
  //   setAllProduct(filteredDate.data);
  //   setHasMore(false);
  // };

  const handleDateFilter = async (update) => {
    const [start, end] = update;
    setStartDate(start);
    setEndDate(end);
    await handleSearch("date", update);
  };

  const handleSearchCustomer = async (e) => {
    setInputSearchCustomer(e.target.value);
    await handleSearch("employee", e.target.value);
  };

  const handleSearchProduct = async (e) => {
    setInputSearchProduct(e.target.value);
    await handleSearch("product", e.target.value);
  };

  const handleSearch = async (type, value) => {
    try {
      const params = new URLSearchParams();
      params.append("product", type === "product" ? value : inputSearchProduct);
      params.append(
        "employee",
        type === "employee" ? value : inputSearchCustomer
      );
      const [startD, endD] = value;
      params.append("startDate", type === "date" ? startD : startDate);
      params.append("endDate", type === "date" ? endD : endDate);

      const stringParams = params.toString();
      const search = await authAxios.get(`/product/search?${stringParams}`);

      setAllProduct(search.data);
      setHasMore(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center  min-h-screen ">
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
