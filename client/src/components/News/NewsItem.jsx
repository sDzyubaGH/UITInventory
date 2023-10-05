import React from "react";

function NewsItem(props) {
  return (
    <div className="flex justify-between px-7 py-5 font-myBeeFont  max-w-3xl mx-auto mt-5 bg-white shadow-lg w-full rounded-md border-2 border-solid border-indigo-300 hover:border-indigo-500 hover:shadow-indigo-400">
      <div className="text-xl text-indigo-950 text-center">
        <p>{props.news.latestActions.userName}</p>
      </div>
      <div className="text-xl    text-indigo-950 text-center">
        {props.news.latestActions.product}
      </div>
      <div className="text-xl   text-indigo-950 text-center">{}</div>
      <div className="text-xl   text-indigo-950 text-center">
        {props.news.latestActions.date}
      </div>
    </div>
  );
}

export default NewsItem;
