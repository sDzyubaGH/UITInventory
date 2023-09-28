import React, { useState } from "react";

import NewsItem from "../components/News/NewsItem";
import SideBar from "../components/Navbar/SideBar";

const Home = () => {
  const [news, setNews] = useState([
    { id: 1, name: "js", action: "delete", date: "13.21.21" },
    { id: 2, name: "js", action: "delete", date: "13.21.21" },
    { id: 3, name: "js", action: "delete", date: "13.21.21" },
    { id: 4, name: "js", action: "delete", date: "13.21.21" },
    { id: 5, name: "js", action: "delete", date: "13.21.21" },
    { id: 6, name: "js", action: "delete", date: "13.21.21" },
    { id: 7, name: "js", action: "delete", date: "13.21.21" },
    { id: 8, name: "js", action: "delete", date: "13.21.21" },
    { id: 9, name: "js", action: "delete", date: "13.21.21" },
    { id: 10, name: "js", action: "delete", date: "13.21.21" },
  ]);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full my-4 items-center pt-8 ml-3 overflow-auto   ">
        <h1 className="text-center text-2xl font-semibold ">Latest change</h1>
        {news.map((news) => (
          <NewsItem news={news} key={news.id} />
        ))}
      </div>
    </div>
  );
};
export default Home;
