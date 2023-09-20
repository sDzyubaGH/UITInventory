import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-2.jpg";
import authAxios from "../axios";

function LoginSingup() {
  const [formLoading, setFormLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");

  const handleFormSumbit = async (event) => {
    event.preventDefault(); // предотвращает перезагрузку страницы
    try {
      setFormLoading(true); // флаг состояния загрузки формы
      const send = await authAxios.post(`/user/login`, { login, password }); // асинхронный запрос

      setToken(send.data.accessToken);
      navigate("/info/home");
    } catch (error) {
      setError(error.send?.data?.message || error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const pwdHandler = (event) => {
    setError("");
    setPassword(event.target.value); //
  };

  const pwdLogin = (event) => {
    setError("");
    setLogin(event.target.value);
  };

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="px-6 py-5">
        <div className="flex justify-center mx-auto">
          <img className="h-8 w-auto sm:h-11" src={Logo} alt="VosLogo" />
        </div>
        <div>
          <h2 className="mt-0 text-center text-xl font-medium text-gray-600">
            Welcome
          </h2>
          <p className="mt-1 text-center font-medium text-gray-400">
            Login or Create Account
          </p>
          <form onSubmit={handleFormSumbit} className="mt-5">
            <div>
              <input
                value={login}
                onChange={pwdLogin}
                className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg hover:border-slate-400 focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Login"
              />
            </div>
            <div>
              <input
                value={password}
                type="password"
                onChange={pwdHandler}
                className="block w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg hover:border-slate-400 focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-center mt-6 mx-auto px-6 pb-2">
              <button className="w-full text-sm capitalize text-white rounded-lg font-semibold bg-blue-500 py-2 px-8 hover:bg-blue-400 tracking-wide">
                Sign In
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mx-auto px-6 ">
            <button className=" w-full text-sm rounded-lg  capitalize text-gray-700 bg-indigo-100 py-2 px-8 hover:bg-slate-300 font-semibold tracking-wide">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSingup;