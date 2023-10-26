import React, { useEffect, useMemo, useState } from "react";
import authAxios from "../service/axios.js";
import ListProductItem from "../components/Archive/ListProductItem";
import InfiniteScroll from "react-infinite-scroll-component";
import ArchiveInputs from "../components/Archive/UI/ArchiveInput.jsx";
import InfiniteScrollLoader from "../components/Archive/UI/InfiInfiniteScrollLoader.jsx";

const Archive = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false); // флаг состояния
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(true);

  let take = 10;
  let skip = page * take;

  const handleFetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await authAxios.get(
        `/product/allProduct?take=${take}&skip=${skip}`
      );

      const fetchData = response.data.map((action) => {
        const toTransform = new Date(action.product.add_date);
        const formattedDate = `${toTransform.getUTCDate()}.${
          toTransform.getUTCMonth() + 1
        }.${toTransform.getUTCFullYear()}`;

        console.log(action);

        const fullProduct = {
          id: action.id,
          customerFullName: action.user.firstName + " " + action.user.surname,
          productName: action.product.name,
          productQuantity: action.product.quantity,
          productAddDate: formattedDate,
        };

        console.log(fullProduct.customerFullName);

        return fullProduct;
      });

      setTimeout(() => {
        setHasMore(fetchData.length > 0);

        setAllProduct((prevProduct) => {
          return [...prevProduct, ...fetchData];
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

  return (
    <div className="flex justify-center  min-h-screen">
      <div className="flex items-center flex-col border border-white my-10 px-10 rounded-xl shadow-2xl shadow-indigo-600 bg-white ">
        <h1 className="mt-5 text-2xl font-myFont ">Архив</h1>
        <ArchiveInputs allProduct={allProduct} />
        <InfiniteScroll
          dataLength={allProduct.length}
          next={handleFetchData}
          hasMore={hasMore}
          loader={<InfiniteScrollLoader />}
        >
          <ListProductItem allProduct={allProduct} />
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Archive;
