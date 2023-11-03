import React from "react";

function FileProduct({ handleChange }) {
  return (
    <div className="mt-20 ml-5 max-w-fit">
      <label
        htmlFor="file-input"
        className="cursor-pointer px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded"
      >
        Выберите файл
      </label>
      <input
        onChange={handleChange}
        id="file-input"
        type="file"
        // multiple
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
      />
    </div>
  );
}

export default FileProduct;
