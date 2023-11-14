import React from "react";
import { IoDocument } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";

function FileProductList({ handleChange, selectedFiles }) {
  const files = Object.values(selectedFiles);
  console.log(files);

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

      <div className="flex flex-col w-full mt-5">
        {files.map((file, index) => (
          <a
            key={index}
            href={URL.createObjectURL(file)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center mt-2 ">
              <FaRegFilePdf style={{ width: "35px", height: "35px" }} />
              <p className="font-myFont">{file.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default React.memo(FileProductList, (prevProps, nextProps) => {
  return prevProps.selectedFiles === nextProps.selectedFiles;
});
