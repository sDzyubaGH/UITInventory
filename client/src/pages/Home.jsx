import React, { useEffect, useState } from "react";
import NewsItem from "../components/News/NewsItem";
import SideBar from "../components/Navbar/SideBar";
import NewsService from "../service/FetchNewsService.js";

const newsService = new NewsService() 

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);

  

  useEffect( () => {
    const fetchData = async()  => {
      setLoading(true)
      try {
        const latestNews = await newsService.getLatestNews()
        setNews(latestNews)
      } catch (error) {
        error.log
      }
      setLoading(false)
    }
    fetchData()
    
  }, [])

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full my-4 items-center pt-8 ml-3 overflow-auto   ">
        <h1 className="text-center text-2xl font-semibold ">Последние изменения</h1>
        {news.map((news, index) => (
          <NewsItem news={news} key={index} />
        ))}
      </div>
    </div>
  );
};
export default Home;
