import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-2.jpg";

function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between py-2">
      <nav className="flex px-10 items-center justify-stretch">
        <Link to="/" className="flex items-center mr-6 ">
          <img className="h-10 w-auto sm:h-16" src={Logo} alt="VosLogo" />
        </Link>
        <div className="flex ml-auto">
          <Link to="/home">
            <h1
              className={`px-2 mx-2 pb-4 mt-6 text-xl  font-semibold ${
                window.location.pathname === "/home"
                  ? "border-b-2 border-indigo-500 text-xl font-semibold text-black "
                  : "hover:border-b-2 border-gray-400 text-gray-500"
              }`}
            >
              Главная
            </h1>
          </Link>
          <Link to="/archive">
            <h1
              className={`px-2 mx-2 pb-4 mt-6 text-xl  font-semibold ${
                window.location.pathname === "/archive"
                  ? "border-b-2 border-indigo-500 text-xl font-semibold text-black "
                  : "hover:border-b-2 border-gray-400 text-gray-500"
              }`}
            >
              Архив
            </h1>
          </Link>
          <Link to="/add">
            <h1
              className={`px-2 mx-2 pb-4 mt-6 text-xl  font-semibold ${
                window.location.pathname === "/add"
                  ? "border-b-2 border-indigo-500 text-xl font-semibold text-black"
                  : "hover:border-b-2 border-gray-400 text-gray-500"
              }`}
            >
              Внести
            </h1>
          </Link>
          <Link to="/delete">
            <h1
              className={`px-2 mx-2 pb-4 mt-6 text-xl  font-semibold ${
                window.location.pathname === "/delete"
                  ? "border-b-2 border-indigo-500 text-xl font-semibold text-black"
                  : "hover:border-b-2 border-gray-400 text-gray-500 "
              }`}
            >
              Выписать
            </h1>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
