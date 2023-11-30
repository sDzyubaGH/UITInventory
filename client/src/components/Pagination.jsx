import React from "react";

function Pagination({ newsPerPage, totalNews, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-row my-5 ">
      {pageNumbers.map((number) => (
        <div key={number}>
          <a
            className={`text-lg  px-4 py-2 mr-2 rounded  text-gray-700 ${
              currentPage === number ? "bg-slate-300" : "hover:bg-gray-200 "
            }`}
            href="#"
            onClick={() => {
              paginate(number);
            }}
          >
            {number}
          </a>
        </div>
      ))}
    </div>
  );
}

export default Pagination;
