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
  ]);

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full my-4 items-center pt-10  ">
        <h1 className="text-center text-2xl font-semibold">Latest change</h1>
        {news.map((news) => (
          <NewsItem news={news} key={news.id} />
        ))}
      </div>
    </div>
  );
};
export default Home;

{
  /* <div className="flex justify-around ">
  <SideBar />
  <div className="mt-14 w-2/4    ">
    <h1 className="text-center font-myBeeFont text-2xl font-[600]  ">
      Последние изменения
    </h1>
    <div>
      {news.map((news) => (
        <NewsItem news={news} key={news.id} />
      ))}
    </div>
  </div>
</div> */
}
{
  /* <div className="flex">
  {/* Sidebar */
}
//   <div className="bg-gray-800 text-white w-1/4 h-screen p-4">
//     <h1 className="text-2xl mb-4">Sidebar</h1>
//     {/* Sidebar content goes here */}
//   </div>

//   {/* Posts */}
//   <div className="w-3/4 p-4">
//     {/* Post 1 */}
//     <div className="bg-white mb-4 p-4">
//       <h2 className="text-xl">Post 1</h2>
//       <p>This is the content of post 1.</p>
//     </div>

//     {/* Post 2 */}
//     <div className="bg-white mb-4 p-4">
//       <h2 className="text-xl">Post 2</h2>
//       <p>This is the content of post 2.</p>
//     </div>

//     {/* Add more posts as needed */}
//   </div>
// </div> */}
