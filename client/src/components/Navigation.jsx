import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-2.jpg";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="flex px-10 mt-16 items-center justify-between">
      <Link to="/" className="mb-10">
        <img className="h-8 w-auto sm:h-11" src={Logo} alt="VosLogo" />
      </Link>
      <div className="flex ml-6 ">
        <Link to="info/home">
          <h1 className="px-2">Главная</h1>
        </Link>
        <Link to="info/archive">
          <h1 className="px-2">Архив</h1>
        </Link>
        <Link to="info/add">
          <h1 className="px-2">Добавить</h1>
        </Link>
        <Link to="info/delete">
          <h1 className="px-2">Удалить</h1>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
