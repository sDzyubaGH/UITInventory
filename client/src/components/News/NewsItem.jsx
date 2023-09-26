import React from "react";

function NewsItem(props) {
  return (
    <div className="flex justify-between px-10 py-6 font-myBeeFont max-w-3xl mx-auto mt-10 bg-white shadow-lg w-full rounded-xl border-2 border-solid border-indigo-300 hover:border-indigo-500">
      <div className="text-xl text-indigo-950 text-center">
        <p>{props.news.id}</p>
      </div>
      <div className="text-xl    text-indigo-950 text-center">
        {props.news.name}
      </div>
      <div className="text-xl   text-indigo-950 text-center">
        {props.news.action}
      </div>
      <div className="text-xl   text-indigo-950 text-center">
        {props.news.date}
      </div>
    </div>
  );
}

export default NewsItem;
