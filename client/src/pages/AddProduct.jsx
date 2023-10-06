import React from "react";
import TableElement from "../components/AddProduct/TableElement";

const AddProduct = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex flex-col  h-[600px] w-[1378px] border-2  p-10 shadow-lg shadow-slate-300 ">
        <h1 className="text-center mb-3">Добавить товар на склад</h1>
        <div className=" space-y-6 mb-7 overflow-hidden hover:overflow-auto h-[216px]">
          <TableElement />
          <TableElement />
          <TableElement />
          <TableElement />
        </div>
        <div className="mt-4">
          {/* <button
            class="inline-block rounded border border-current px-10 py-2 text-sm font-medium text-indigo-600  shadow-lg shadow-indigo-400 focus:outline-none focus:ring active:text-indigo-500"
            href="/download"
          >
            Добавить
          </button> */}

          <button class="group relative inline-block text-sm font-semibold text-indigo-600   ">
            <span class="rounded absolute inset-0 translate-x-0.5 translate-y-0.5 bg-indigo-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0  "></span>
            <span class="rounded relative block border border-current bg-white px-10 py-2 active:bg-indigo-600 active:text-white ">
              Добавить
            </span>
          </button>
        </div>
        <div className="relative inline-block mt-14  ">
          <label
            for="file-input"
            className="cursor-pointer px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded "
          >
            Выберите файл
          </label>
          <input
            id="file-input"
            type="file"
            name="file[]"
            multiple
            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
          />
        </div>

        <div className=" ml-auto mt-20  ">
          <button className=" inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-semibold text-white transition hover:scale-110 hover:shadow-xl focus:outline-none  active:bg-indigo-500">
            Загрузить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
