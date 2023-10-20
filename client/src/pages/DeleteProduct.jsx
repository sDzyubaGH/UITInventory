import React from "react";
import { IoSearchCircleSharp } from "react-icons/io5";

const DeleteProduct = () => {
  return (
    <div className="grid grid-cols-3 gap-4 grid-flow-row items-center h-screen justify-items-center ">
      <div className="h-[500px] w-[600px] border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white">
        <div>
          <h1 className="text-center font-myFont text-2xl mt-4 ">Печать</h1>
        </div>
        <input
          type="text"
          className="mt-10 w-1/2 ml-5 h-10 pl-3 text-md font-myFont rounded-lg border-2 border-black shadow-lg focus:outline-none focus:shadow-orange-500 hover:shadow-orange-500"
          placeholder="Номер кабинета"
        />
        <input
          type="text"
          className="mt-4 w-1/2 ml-5 h-10 pl-3 text-md font-myFont rounded-lg border-2 border-black shadow-lg focus:outline-none focus:shadow-orange-500 hover:shadow-orange-500"
          placeholder="Сотрудник"
        />
        <div class="border-t  border-gray-500 my-3">
          <h2 className="text-xl font-myFont ml-4 mt-2">Подписанты</h2>
        </div>
        <select
          className="mt-2 w-1/2 ml-5 h-10 pl-3 text-md font-myFont rounded-lg border-2 border-black shadow-lg focus:outline-none  hover:shadow-orange-500 bg-white"
          placeholder="Сотрудник-1"
        >
          <option>Сотрудник</option>
          <option>Сотрудник</option>
        </select>

        <select
          className="mt-3 w-1/2 ml-5 h-10 pl-3 text-md font-myFont rounded-lg border-2 border-black shadow-lg focus:outline-none  hover:shadow-orange-500 bg-white"
          placeholder="Сотрудник-1"
        >
          <option>Сотрудник</option>
          <option>Сотрудник</option>
        </select>
        <div className="mt-10 text-center mx-24">
          <button className="w-full border-2 border-indigo-600 shadow-indigo-600 bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-400 h-12 rounded-xl text-lg font-myFont shadow-lg focus:outline-none ">
            Печать
          </button>
        </div>
      </div>
      <div className="w-4/5 h-[700px] border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white">
        <div className="h-full mx-5 flex flex-col">
          <h1 className="text-center font-myFont text-2xl mt-4 border-b border-gray-400">
            Последние добавленные на склад
          </h1>
          <div className="relative">
            <IoSearchCircleSharp className="absolute top-2 left-1 text-indigo-500 mt-10 text-3xl" />
            <input
              className="mt-10 w-full h-12 rounded-md border-2 border-black  shadow-xl focus:outline-none pl-9 text-xl font-myFont focus:shadow-orange-500 hover:shadow-orange-500"
              type="text"
              placeholder="Найти товар...."
            />
          </div>

          <div className="flex flex-col mt-14 px-5 gap-y-6 overflow-auto ">
            <div className="flex flex-col justify-between px-5 border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont  ">
              <h1 className="overflow-auto border-b border-b-black">
                Заголовок (название товара) Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Explicabo, a laboriosam vitae
                alias cupiditate eligendi laborum vel libero possimus quisquam
                cum modi ipsam fugiat facere quia, ex provident amet beatae.
              </h1>
              <div className="flex justify-around">
                <p>Дата</p>
                <p>Кто выписал</p>
              </div>
            </div>

            <div className="flex flex-col justify-between px-5 border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont  ">
              <h1 className="overflow-auto border-b border-b-black">
                Заголовок (название товара) Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Explicabo, a laboriosam vitae
                alias cupiditate eligendi laborum vel libero possimus quisquam
                cum modi ipsam fugiat facere quia, ex provident amet beatae.
              </h1>
              <div className="flex justify-around">
                <p>Дата</p>
                <p>Кто выписал</p>
              </div>
            </div>
            <div className="flex flex-col justify-between px-5 border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont  ">
              <h1 className="overflow-auto border-b border-b-black">
                Заголовок (название товара) Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Explicabo, a laboriosam vitae
                alias cupiditate eligendi laborum vel libero possimus quisquam
                cum modi ipsam fugiat facere quia, ex provident amet beatae.
              </h1>
              <div className="flex justify-around">
                <p>Дата</p>
                <p>Кто выписал</p>
              </div>
            </div>
            <div className="flex flex-col justify-between px-5 border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont  ">
              <h1 className="overflow-auto border-b border-b-black">
                Заголовок (название товара) Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Explicabo, a laboriosam vitae
                alias cupiditate eligendi laborum vel libero possimus quisquam
                cum modi ipsam fugiat facere quia, ex provident amet beatae.
              </h1>
              <div className="flex justify-around">
                <p>Дата</p>
                <p>Кто выписал</p>
              </div>
            </div>
            <div className="flex flex-col justify-between px-5 border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont  ">
              <h1 className="overflow-auto border-b border-b-black">
                Заголовок (название товара) Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Explicabo, a laboriosam vitae
                alias cupiditate eligendi laborum vel libero possimus quisquam
                cum modi ipsam fugiat facere quia, ex provident amet beatae.
              </h1>
              <div className="flex justify-around">
                <p>Дата</p>
                <p>Кто выписал</p>
              </div>
            </div>
            <div className="flex flex-col justify-between px-5 border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont  ">
              <h1 className="overflow-auto border-b border-b-black">
                Заголовок (название товара) Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Explicabo, a laboriosam vitae
                alias cupiditate eligendi laborum vel libero possimus quisquam
                cum modi ipsam fugiat facere quia, ex provident amet beatae.
              </h1>
              <div className="flex justify-around">
                <p>Дата</p>
                <p>Кто выписал</p>
              </div>
            </div>
            <div className="flex flex-col justify-between px-5 border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont  ">
              <h1 className="overflow-auto border-b border-b-black">
                Заголовок (название товара) Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Explicabo, a laboriosam vitae
                alias cupiditate eligendi laborum vel libero possimus quisquam
                cum modi ipsam fugiat facere quia, ex provident amet beatae.
              </h1>
              <div className="flex justify-around">
                <p>Дата</p>
                <p>Кто выписал</p>
              </div>
            </div>
            <div className="flex flex-col justify-between px-5 border-2 hover:border-dashed border-black rounded-xl text-lg font-myFont  ">
              <h1 className="overflow-auto border-b border-b-black">
                Заголовок (название товара) Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Explicabo, a laboriosam vitae
                alias cupiditate eligendi laborum vel libero possimus quisquam
                cum modi ipsam fugiat facere quia, ex provident amet beatae.
              </h1>
              <div className="flex justify-around">
                <p>Дата</p>
                <p>Кто выписал</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-4/5 h-[700px] border-2 border-indigo-500 shadow-lg shadow-indigo-400 bg-white">
        <div className="flex flex-col items-center">
          <h1 className="font-myFont text-2xl mt-4 border-b border-gray-400">
            Выписать
          </h1>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
