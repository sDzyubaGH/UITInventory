import React from "react";
import { FaRegFilePdf } from "react-icons/fa";

function FileProductList({ handleChange, selectedFiles }) {
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
      {selectedFiles.length != 0 && (
        <div className="flex flex-col w-1/2 mt-5 border border-indigo-500 shadow-md rounded-lg p-5">
          <p className="text-lg font-myFont ml-1">Прикрепленные файлы:</p>
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
      )}
    </div>
  );
}

export default React.memo(FileProductList, (prevProps, nextProps) => {
  return prevProps.selectedFiles === nextProps.selectedFiles;
});
