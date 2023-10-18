import React, { useEffect, useState } from "react";
import NewsItem from "../components/News/NewsItem";
import NewsService from "../service/HomeService/NewsService.js";
import Pagination from "../components/Pagination";

const newsService = new NewsService();

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);

  const lastIndex = currentPage * newsPerPage;
  const firtsIndex = lastIndex - newsPerPage;
  const currentIndex = news.slice(firtsIndex, lastIndex);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const latestNews = await newsService.getLatestNews();
      setNews(latestNews);
      setLoading(false);
    };
    fetchData();
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex">
        {/* <SideBar /> */}
        <div className="flex flex-col w-full  mb-7 items-center m-4 ml-3">
          <h1 className="text-center text-2xl font-myFont mt-2">
            Последние изменения
          </h1>
          {currentIndex.map((news, index) => (
            <NewsItem news={news} key={index} />
          ))}
          <Pagination
            newsPerPage={newsPerPage}
            totalNews={news.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
