import React, { useEffect, useState } from "react";

import NewsItem from "../components/News/NewsItem";
import SideBar from "../components/Navbar/SideBar";
import authAxios from "../service/axios.js"

const Home = () => {
  const [news, setNews] = useState([
  ]);

  
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [newsOnPage] = useState(10)
  
  useEffect( () => {
    setLoading(true)
  }, []
  )

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full my-4 items-center pt-8 ml-3 overflow-auto   ">
        <h1 className="text-center text-2xl font-semibold ">Последние изменения</h1>
        {news.map((news) => (
          <NewsItem news={news} key={news.id} />
        ))}
      </div>
    </div>
  );
};
export default Home;
