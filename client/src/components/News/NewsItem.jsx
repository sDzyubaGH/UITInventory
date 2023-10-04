import React from "react";

function NewsItem(props) {
  
  return (
    <div className="flex justify-between px-10 py-6 font-myBeeFont overflow-auto max-w-3xl mx-auto mt-10 bg-white shadow-lg w-full rounded-xl border-2 border-solid border-indigo-300 hover:border-indigo-500">
      <div className="text-xl text-indigo-950 text-center">
        <p>{props.news.latestActions.userName}</p>
      </div>
      <div className="text-xl    text-indigo-950 text-center">
        {props.news.latestActions.product}
      </div>
      <div className="text-xl   text-indigo-950 text-center">
        {}
      </div>
      <div className="text-xl   text-indigo-950 text-center">
        {props.news.latestActions.date}
      </div>
    </div>
  );
}

export default NewsItem;
