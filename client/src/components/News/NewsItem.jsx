import React from "react";

function NewsItem({ news }) {
  return (
    <div className="flex flex-col justify-between p-5 font-myFont text-lg mt-5 bg-white shadow-lg w-[600px] rounded-md border-2  border-indigo-300 hover:border-indigo-500 hover:shadow-indigo-400 animate-delay-200 animate-fade-down">
      <h1 className="overflow-auto border-b border-b-black max-h-20 ">
        {news.latestActions.product}
      </h1>
      <div className="flex justify-around mt-2">
        <p className="">{news.latestActions.userName}</p>
        <div>
          {news.latestActions.type === "ADD" ? (
            <div>
              <p className="text-green-600 font-myFont">Добавлено</p>
              <p className="font-myFont text-center">
                {news.latestActions.quantity + " шт."}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-red-500 font-myFont">Выписано</p>
              <p className="font-myFont text-center">
                {news.latestActions.issuedQuantity + " шт."}
              </p>
            </div>
          )}
        </div>
        <p>{news.latestActions.date}</p>
      </div>
    </div>
  );
}

export default NewsItem;
