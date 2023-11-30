import React from "react";

function NewsItem({ news }) {
  return (
    <div className="flex flex-col justify-between p-5 font-myFont text-lg mt-5 bg-white shadow-lg w-[600px] rounded-md border-2  border-indigo-300 hover:border-indigo-500 hover:shadow-indigo-400 animate-delay-200 animate-fade-down">
      <h1 className="overflow-auto border-b border-b-black max-h-20 ">{news.product.name}</h1>
      <div className="flex justify-around mt-2">
        <p className="">{`${news.user.firstName} ${news.user.surname}`}</p>
        <div>
          <div>
            <p className={`${news.type === "ADD" ? "text-green-600" : "text-red-500"} font-myFont`}>
              {news.type === "ADD" ? "Добавлено" : "Выписано"}
            </p>
            <p className="font-myFont text-center">{news.quantity + " шт."}</p>
          </div>
        </div>
        <p>{new Date(news.date).toLocaleDateString("ru-RU")}</p>
      </div>
    </div>
  );
}

export default NewsItem;
