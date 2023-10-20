import React, { useState } from "react";
import { IoSearchCircleSharp } from "react-icons/io5";
import { MdPersonSearch } from "react-icons/md";

const ArchiveInputs = ({ allProduct }) => {
  const [searchProduct, setSearchProduct] = useState("");
  const filterProduct = allProduct.filter((item) => {
    const newArray = allProduct.map((product) =>
      product.productName.toLowerCase()
    );
    const filter = newArray.filter((item) =>
      item.includes(searchProduct.toLowerCase())
    );
    console.log(filter);
  });

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearchProduct(event.target.value);
  };

  return (
    <div className="mt-8 flex ">
      <div className="relative">
        <IoSearchCircleSharp className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 hover:text-black" />
        <input
          type="text"
          className="bg-white h-9 rounded-lg pl-10 border-orange-300 border-2 shadow-md focus:outline-none"
          placeholder="Поиск товара..."
          onChange={handleSearch}
        />
      </div>

      <div className="relative ml-2">
        <MdPersonSearch className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 hover:text-black" />
        <input
          type="text"
          className="bg-white h-9 rounded-lg pl-10 border-orange-300 border-2 shadow-md focus:outline-none"
          placeholder="Поиск сотрудника..."
        />
      </div>
      <input
        type="date"
        className="bg-white ml-2  h-9 rounded-lg pl-2 border-orange-300 border-2 shadow-md focus:outline-none"
      />
      <input
        type="date"
        className="bg-white ml-2  h-9 rounded-lg pl-2 border-orange-300 border-2 shadow-md focus:outline-none"
      />
    </div>
  );
};

export default ArchiveInputs;