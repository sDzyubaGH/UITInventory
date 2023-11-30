import React from "react";

function ProductDismissAlert({ props }) {
  return (
    <div
      id="dismiss-alert"
      className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-teal-50 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500"
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="flex-shrink-0 h-4 w-4 text-blue-600 mt-1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>
        <div className="ms-2">
          <div className="text-sm  font-myFont">Товары были выписаны</div>
        </div>
      </div>
    </div>
  );
}

export default ProductDismissAlert;
