import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../contexts/userContexts";

import logo from "../assets/logo.png";
import vectorLogo from "../assets/jobVector.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { storeUserId } = useUser();

  const checkTokens = () => {
    const token = document.cookie.split("=")[1];
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    checkTokens();
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  const setToken = (token) => {
    // set the token in cookie no expiry date
    document.cookie = `token=${token}; path=/; Secure; SameSite=Strict; `;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      setData(response.data);
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      navigate("/home");
      storeUserId(response.data.user._id);
      console.log(response.data.user._id);
      setToken(response.data.token);
    } catch (error) {
      console.log(error);
      if (error.response) {
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Something went wrong!",
        });
      }
    }
  };

  //function for showing password if the input type is password change it to text and vice versa
  const showPass = () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      setShowPassword(!showPassword);
    } else {
      passwordInput.type = "password";
      setShowPassword(!showPassword);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[#d5dbe1] phone:w-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white w-fit h-fit rounded-s-lg shadow-2xl phone:w-[25rem] laptop:w-fit tablet:w-[35rem]"
      >
        <div className="laptop:mx-24 relative phone:mx-12 tablet:mx-16">
          <div className=" flex items-center mt-20 mb-4">
            <img src={logo} alt="logo" className=" w-12" />
            <h1 className=" text-blue-800 text-3xl font-bold font-Poppins ml-3">
              JobNexus
            </h1>
          </div>
          <h3 className=" text-black laptop:text-2xl font-bold phone:text-xl transition-all duration-300">
            Log in to your Account
          </h3>

          <div className="inline-flex items-center justify-center w-full">
            <hr className="laptop:w-96 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 tablet:w-full" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 phone:text-[0.7rem] laptop:text-base">
              Enter your Credentials
            </span>
          </div>

          <div>
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute left-4 top-4 text-lg"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                className=" peer focus:border-none focus:outline-none  w-full pl-10 h-12 bg-[#fafbfe] rounded-lg placeholder-transparent "
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label
                htmlFor="email"
                className=" absolute -top-3 left-10 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all duration-150 ease-in peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-sm "
              >
                Email Address
              </label>
            </div>
          </div>
          <div className=" my-5">
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-4 top-4 text-lg"
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className=" focus:border-none focus:outline-none peer w-full pl-10 h-12 bg-[#fafbfe] rounded-lg placeholder-transparent"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label
                htmlFor="password"
                className=" absolute -top-3 left-10 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all duration-150 ease-in peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-sm "
              >
                Password
              </label>
              <FontAwesomeIcon
                icon={faEye}
                className="absolute right-4 top-4 text-lg hover:cursor-pointer"
              />
              {showPassword ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="absolute right-4 top-4 text-lg hover:cursor-pointer"
                  onClick={showPass}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className="absolute right-4 top-4 text-lg hover:cursor-pointer"
                  onClick={showPass}
                />
              )}
            </div>
          </div>
          <div className=" flex justify-between">
            <div className=" flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className=" w-4 h-4 mr-2"
              />
              <label
                htmlFor="remember"
                className="inline-block cursor-pointer text-gray-700 font-medium select-none"
              >
                Remember me
              </label>
            </div>
            <Link className=" text-[#3B82F6] font-semibold">
              Forgot Password?
            </Link>
          </div>
          <div className=" flex justify-center">
            <button className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 transition-all duration-300 h-11 rounded-xl w-full text-center my-7">
              Login
            </button>
          </div>
          <div className=" flex justify-center mb-20">
            <p>Don't have an account?</p>
            <Link to="/signup" className=" ml-2 text-[#3B82F6] font-semibold">
              Create an account
            </Link>
          </div>
        </div>
      </form>
      <div className=" bg-blue-700 h-fit flex-shrink-0 w-fit hidden desktop:block shadow-2xl rounded-e-lg ">
        <img src={vectorLogo} alt="vector" className="  my-[6.5rem] h-96" />
      </div>
    </div>
  );
};

export default Login;
