import React from "react";

function FileProduct({ handleChange, selectedFiles }) {
  console.log(typeof selectedFiles);
  console.log(selectedFiles[0]);

  const files = Object.values(selectedFiles);

  return (
    <div className="mt-8 ml-5 min-w-fit">
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
        multiple
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
      />

      <div className="flex flex-col  ">
        {files.map((file) => (
          <embed
            className="mr-5 w-2/3 h-[500px] my-5 "
            src={URL.createObjectURL(file)}
          />
        ))}
      </div>
    </div>
  );
}

export default FileProduct;
