import React from "react";
import NewsItem from "./NewsItem";

function NewsList({ currentIndex }) {
  return (
    <div>
      {currentIndex.map((news, index) => (
        <NewsItem news={news} key={index} />
      ))}
    </div>
  );
}

export default NewsList;
