import React, { useState } from "react";
import Logo from "../assets/logo-2.jpg";
import { useNavigate } from "react-router-dom";
import authAxios from "../service/axios";
import { useAuth } from "../contexts/AuthContext";

function Registration() {
  const navigate = useNavigate();
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPwd] = useState("");
  const [surname, setSurname] = useState("");
  const [position, setPosition] = useState("");
  const [firstName, setFirstName] = useState("");
  const [success, setSuccess] = useState("");
  const { setToken } = useAuth();

  const handleForm = async (event) => {
    event.preventDefault();
    setFormLoading(true);
    try {
      const send = await authAxios.post(`/user/registration`, {
        login,
        password,
        firstName,
        surname,
        position,
      });
      setSuccess(send.data.message);
      setToken(send.data.accessToken);
      const iId = setInterval(() => {
        navigate("/info/home");
        clearInterval(iId);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setFormLoading(true);
    }
  };

  const handleName = (event) => {
    setFirstName(event.target.value);
  };

  const handleSurname = (event) => {
    setSurname(event.target.value);
  };
  const handlePosition = (event) => {
    setPosition(event.target.value);
  };

  const handlePassword = (event) => {
    setPwd(event.target.value);
  };

  const handleLogin = (event) => {
    setLogin(event.target.value);
  };

  return (
    <div className="">
      <form
        onSubmit={handleForm}
        className="bg-white p-10 rounded-lg shadow-lg min-w-full"
      >
        <div className="flex justify-center pb-1">
          <img className="h-12 w-auto sm:h-12" src={Logo} alt="LogoVos" />
        </div>
        <h1 className="text-center text-xl font-semibold text-gray-600 mb-2">
          Registration Form
        </h1>

        {success ? (
          <p className="mb-2 text-green-500  text-center">{success}</p>
        ) : (
          <p className="mb-2 text-red-500 break-all text-center">{error}</p>
        )}

        <div className="flex flex-col space-y-3 w-80 ">
          <div>
            <input
              className="block rounded-lg border p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 "
              placeholder="Name"
              value={firstName}
              onChange={handleName}
            />
          </div>
          <div>
            <input
              className="block rounded-lg border p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Surname"
              value={surname}
              onChange={handleSurname}
            />
          </div>

          <div>
            <p>
              <select
                name="list1"
                className="block rounded-lg border bg-white p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 text-black "
                autoFocus
                value={position}
                onChange={handlePosition}
              >
                <option>Главный специалист</option>
                <option>Системный Администратор</option>
              </select>
            </p>
          </div>

          <div>
            <input
              className="block rounded-lg border p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Login"
              value={login}
              onChange={handleLogin}
            />
          </div>

          <div>
            <input
              className="block rounded-lg border p-2 px-4 w-full focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
          </div>
        </div>
        <button className="w-full mt-7 bg-blue-500 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold  hover:bg-blue-400">
          Register
        </button>
        <button
          className="w-full mt-3  mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-700 tracking-wide font-semibold hover:bg-slate-300"
          onClick={(event) => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Registration;
