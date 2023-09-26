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
  ]);

  return (
    <div>
      <div className="flex justify-center">
        <SideBar />
        <div className="mt-14 w-2/4 ">
          <h1 className="text-center font-myBeeFont text-2xl font-[600] ">
            Последние изменения
          </h1>
          <div>
            {news.map((news) => (
              <NewsItem news={news} key={news.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
