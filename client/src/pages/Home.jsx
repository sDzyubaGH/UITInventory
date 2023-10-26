import React, { useEffect, useState } from "react";
import NewsItem from "../components/News/NewsItem";
import NewsService from "../service/HomeService/NewsService.js";
import Pagination from "../components/Pagination";
import NewsList from "../components/News/NewsList";

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
      <div>
        <h1 className="text-center text-2xl font-myFont mt-3">
          Последние изменения
        </h1>
        <div className="flex flex-col items-center">
          <NewsList currentIndex={currentIndex} />
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
