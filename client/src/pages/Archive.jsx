import React, { useEffect, useState } from "react";
import authAxios from "../service/axios.js";
import ListProductItem from "../components/Archive/ListProductItem";
import InfiniteScroll from "react-infinite-scroll-component";

const Archive = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false); // флаг состояния
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0); // текущая страница
  const [error, setError] = useState(true);

  let take = 8;
  let skip = page * take;

  console.log(allProduct);

  const handleFetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await authAxios.get(
        `http://localhost:8000/api/product/allProduct?take=${take}&skip=${skip}`
      );

      const fetchData = response.data.map((product) => {
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

      setTimeout(() => {
        setHasMore(fetchData.length > 0);

        setAllProduct((prevProduct) => {
          return [...prevProduct, ...fetchData];
        });

        setPage((prevPage) => prevPage + 1);
      }, 3000);
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

  return (
    <div
      className="flex justify-center bg-white"
      style={{ overflow: "hidden" }}
    >
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
        <InfiniteScroll
          className="overflow-hidden"
          dataLength={allProduct.length}
          next={handleFetchData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center mt-4">
              <div className=" h-10 w-10 animate-spin rounded-full border-8 border-t-4 border-indigo-600" />
            </div>
          }
          endMessage={<p>the end</p>}
        >
          <ListProductItem allProduct={allProduct} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Archive;
