import React, { useEffect, useState } from "react";
import authAxios from "../service/axios";
import ListProductItem from "../components/Archive/ListProductItem";

const Archive = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);

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

        return { fullProduct };
      });
      setAllProduct(fetchData);
    } catch (error) {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-red-500">
      <div className="flex items-center flex-col border border-white my-10 px-10">
        <div className="mt-20">
          <input
            type="text"
            className="bg-white w-[410px] h-9 rounded-lg pl-5"
          />
          <input
            type="text"
            className="bg-white ml-4 w-[410px] h-9 rounded-lg pl-5"
          />
        </div>
        <ListProductItem allProduct={allProduct} />
      </div>
    </div>
  );
};

export default Archive;
