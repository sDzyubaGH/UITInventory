import React from "react";
import Logo from "../assets/logo-2.jpg";

function Registration() {
  return (
    <div className="">
      <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
        <div className="flex justify-center pb-1">
          <img className="h-12 w-auto sm:h-12" src={Logo} alt="LogoVos" />
        </div>
        <h1 className="text-center text-xl font-semibold text-gray-600 mb-8">
          Registration Form
        </h1>
        <div className="flex flex-col space-y-3">
          <div>
            <input
              className="block rounded-lg border p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 "
              placeholder="Name"
            />
          </div>
          <div>
            <input
              className="block rounded-lg border p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Surname"
            />
          </div>

          <div>
            <p>
              <select
                name="list1"
                className="block rounded-lg border bg-white p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 text-gray-400 "
                autoFocus
              >
                <option>Position</option>
                <option>Главный Системный Администратор</option>
                <option>Главный специалист</option>
              </select>
            </p>
          </div>

          <div>
            <input
              className="block rounded-lg border p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Login"
            />
          </div>

          <div>
            <input
              className="block rounded-lg border p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Password"
            />
          </div>

          <div>
            <input
              className="block rounded-lg border p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        <button className="w-full mt-7 bg-blue-500 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold  hover:bg-blue-400">
          Register
        </button>
        <button className="w-full mt-3  mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-700 tracking-wide font-semibold hover:bg-slate-300">
          Login
        </button>
      </form>
    </div>
  );
}

export default Registration;
