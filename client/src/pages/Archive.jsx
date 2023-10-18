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

  // console.log(allProduct);
  //Search
  const filterProduct = useMemo(
    (textMessage) => {
      return [...allProduct].filter((item) => {
        item.productName.includes(textMessage);
      });
    },
    [setAllProduct]
  );

  return (
    <div className="flex justify-center bg-white min-h-screen">
      <div className="flex items-center flex-col border border-white my-10 px-10  shadow-2xl shadow-indigo-400 bg-white ">
        <h1 className="mt-5 text-2xl font-myFont ">Архив</h1>
        <ArchiveInputs filterProduct={filterProduct} />
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
