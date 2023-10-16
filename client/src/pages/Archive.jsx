import React, { useEffect, useState } from "react";
import authAxios from "../service/axios.js";
import ListProductItem from "../components/Archive/ListProductItem";

const Archive = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
    console.log("scrollHeight", e.target.documentElement.scrollHeight);
    console.log("scrollHeight", e.target.documentElement.scrollTop);
    console.log("scrollHeight", window.innerHeight);
  };

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const response = await authAxios.get(
        "http://localhost:8000/api/product/allProduct"
      );
      const fetchData = response.data.fullProduct.map((product) => {
        const toTransform = new Date(product.add_date);
        const formattedDate = `${toTransform.getUTCDate()}.${
          toTransform.getUTCMonth() + 1
        }.${toTransform.getUTCFullYear()}`;

        const fullProduct = {
          id: product.id,
          productName: product.name,
          productQuantity: product.quantity,
          productAddDate: formattedDate,
        };

        return fullProduct;
      });
      setAllProduct(fetchData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (fetching) {
      handleFetchData();
    }
  }, [fetching]);

  return (
    <div className="flex justify-center min-h-screen bg-white ">
      <div className="flex items-center flex-col border border-white my-10 px-10  shadow-2xl shadow-indigo-400 bg-white">
        <h1 className="mt-5 text-2xl font-myFont ">Архив</h1>
        <div className="mt-12">
          <input
            type="text"
            className="bg-white w-[410px] h-9 rounded-lg pl-5 border-orange-300 border-2 shadow-md focus:outline-none"
          />
          <input
            type="text"
            className="bg-white ml-4 w-[410px] h-9 rounded-lg pl-5 border-orange-300 border-2 shadow-md focus:outline-none"
          />
        </div>
        <ListProductItem allProduct={allProduct} />
      </div>
    </div>
  );
};

export default Archive;
