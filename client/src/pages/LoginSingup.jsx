import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo-2.jpg";
import authAxios from "../service/axios";
import { ImSpinner9 } from "react-icons/im";

function LoginSingup() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");

  const handleFormSumbit = async (event) => {
    event.preventDefault(); // предотвращает перезагрузку страницы
    try {
      setIsLoading(true); // флаг состояния загрузки формыs
      setError(false);
      const send = await authAxios.post(`/user/login`, { login, password }); // асинхронный запрос
      const token = send.data.accessToken;

      setToken(token);
      navigate("/home");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const pwdHandler = (event) => {
    setError("");
    setPassword(event.target.value); //
  };

  const loginHandler = (event) => {
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
          <h2 className="mt-0 text-center text-xl font-medium text-gray-600">Welcome</h2>
          <p className="mt-1 text-center font-medium text-gray-400">Login or Create Account</p>
          {error && <p className="mb-2 font-myFont text-red-500 break-all text-center">{error}</p>}
          <form onSubmit={handleFormSumbit} className="mt-5">
            <div>
              <input
                value={login}
                onChange={loginHandler}
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
              <button
                className="w-full text-l capitalize text-white rounded-lg font-semibold bg-blue-500 py-2 px-8 hover:bg-blue-400 tracking-wide "
                onClick={handleFormSumbit}
              >
                {!isLoading ? (
                  <div>
                    <p>Sign In</p>
                  </div>
                ) : (
                  <ImSpinner9 className="animate-spin w-5 h-5 cursor-wait m-auto" />
                )}
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center mx-auto px-6 ">
            <button
              className=" w-full  rounded-lg  capitalize text-gray-700 bg-indigo-100 py-2 px-8 hover:bg-slate-300 font-semibold tracking-wide text-l"
              onClick={(event) => {
                navigate("/reg");
              }}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSingup;
