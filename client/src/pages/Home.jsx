import React, { useEffect, useState } from "react";

import NewsItem from "../components/News/NewsItem";
import SideBar from "../components/Navbar/SideBar";
import ProductService from "../service/productService";

const Home = () => {
  const [news, setNews] = useState([]);

  const scrollHandler = (e) => {

  }
 
  
  

  //Перенести в FetchService (колбэк проп)
  async function fetchNews() {  
    const response = await ProductService.getLatest()
    
    const latestActions = response.data.latestActions.map((post) => {

      const productInfo = post.product
      const userInfo = post.user

      const toTransform = new Date(productInfo.add_date)
      const formattedDate = `${toTransform.getUTCDate()}.${toTransform.getUTCMonth() + 1}.${toTransform.getUTCFullYear()}`

      const latestActions = {
        userName: userInfo.firstName + " " + userInfo.surname,
        product: productInfo.name,
        date: formattedDate,
      }
  
      return {latestActions}
    })

    setNews(latestActions)
  }

  useEffect( () => {
    fetchNews()
  }, []
  )




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
