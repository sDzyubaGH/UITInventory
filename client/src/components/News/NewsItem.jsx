import React from "react";

function NewsItem(props) {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border-2 border-solid border-indigo-300 hover:border-indigo-500">
      <div className="flex justify-between px-10 font-myBeeFont ">
        <div className="flex flex-col items-center ">
          <label className="text-xl   text-indigo-950 text-center">
            {props.news.id}
          </label>
        </div>
        <div className="flex flex-col items-center">
          <label className="text-xl    text-indigo-950 text-center">
            {props.news.name}
          </label>
        </div>
        <div className="flex flex-col items-center">
          <label className="text-xl   text-indigo-950 text-center">
            {props.news.action}
          </label>
        </div>
        <div className="flex flex-col items-center">
          <label className="text-xl   text-indigo-950 text-center">
            {props.news.date}
          </label>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
