import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import logo from "../assets/logo.png";
import jobDetails from "../assets/jobDetails.png";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faClipboardCheck,
  faCaretDown,
  faCaretUp,
  faUser,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [data, setData] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [roleSelected, setRoleSelected] = useState("Select your role");
  const navigate = useNavigate();

  const checkToken = () => {
    const token = document.cookie.split("=")[1];
    if (token) {
      navigate("/home");
    } else {
      navigate("/signup");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/", {
        email,
        name: {
          firstName: firstName,
          lastName: lastName,
        },
        password,
        role,
        active: true,
      });
      setData(response.data);
      //set the token in cookies instead of local storage for security reasons (httpOnly)
      document.cookie = `token=${response.data.token}; path=/`;
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const showPassword = () => {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      setShowPass(!showPass);
    } else {
      passwordInput.type = "password";
      setShowPass(!showPass);
    }
  };

  const roleOptions = [
    { label: "Recruiter", icon: faBriefcase },
    { label: "Job Seeker", icon: faUser },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-[#d5dbe1] phone:w-screen">
      <form
        onSubmit={handleSignUp}
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
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 phone:text-[0.7rem] laptop:text-base tablet:text-base">
              Enter your Information
            </span>
          </div>
          <div className=" relative">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="absolute left-4 top-4 text-lg"
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className=" peer focus:border-none focus:outline-none  w-full pl-10 h-12 bg-[#fafbfe] rounded-lg placeholder-transparent border-none outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className=" absolute -top-3 left-10 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all duration-150 ease-in peer-focus:-top-2.5 peer-focus:text-gray-800 peer-focus:text-sm "
            >
              Email Address
            </label>
          </div>
          <div className="flex gap-2 my-5">
            <div className=" relative">
              <FontAwesomeIcon
                icon={faAddressCard}
                className="absolute left-4 top-4 text-lg"
              />
              <input
                id="firstName"
                name="firstName"
                type="text"
                className=" peer focus:border-none focus:outline-none  w-full pl-10 h-12 bg-[#fafbfe] rounded-lg placeholder-transparent border-none outline-none"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label
                htmlFor="firstName"
                className=" absolute -top-3 left-10 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all duration-150 ease-in peer-focus:-top-2.5 peer-focus:text-gray-800 peer-focus:text-sm "
              >
                First Name
              </label>
            </div>
            <div className=" relative">
              <FontAwesomeIcon
                icon={faAddressCard}
                className="absolute left-4 top-4 text-lg"
              />
              <input
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className=" peer focus:border-none focus:outline-none  w-full pl-10 h-12 bg-[#fafbfe] rounded-lg placeholder-transparent border-none outline-none"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
              <label
                htmlFor="lastName"
                className=" absolute -top-3 left-10 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all duration-150 ease-in peer-focus:-top-2.5 peer-focus:text-gray-800 peer-focus:text-sm "
              >
                Last Name
              </label>
            </div>
          </div>

          <div className="relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute left-4 top-4 text-lg"
            />
            <input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              className=" peer focus:border-none focus:outline-none  w-full pl-10 h-12 bg-[#fafbfe] rounded-lg placeholder-transparent border-none outline-none "
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="  absolute -top-3 left-10 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all duration-150 ease-in peer-focus:-top-2.5 peer-focus:text-gray-800 peer-focus:text-sm "
            >
              Password
            </label>
            {showPass ? (
              <FontAwesomeIcon
                icon={faEye}
                className="absolute right-4 top-4 text-lg hover:cursor-pointer"
                onClick={showPassword}
              />
            ) : (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="absolute right-4 top-4 text-lg hover:cursor-pointer"
                onClick={showPassword}
              />
            )}
          </div>
          <div className="relative my-5">
            <div className="relative">
              <motion.div
                className="w-full h-12 rounded-lg bg-[#fafbfe] hover:bg-[#e7ebf7] cursor-pointer flex justify-between items-center pl-10 pr-5  transition-all duration-300 ease-in-out "
                onClick={() => {
                  setIsActive(!isActive);
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon
                  icon={faClipboardCheck}
                  className="absolute left-4 top-4 text-lg z-10 "
                />
                <span className="text-gray-400">{roleSelected}</span>
                <FontAwesomeIcon
                  icon={isActive ? faCaretUp : faCaretDown}
                  className="text-lg text-black"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: isActive ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 mt-1 w-full bg-[#f2f0fe] rounded-lg overflow-hidden shadow-lg"
            >
              {roleOptions.map((option, index) => (
                <motion.div
                  key={index}
                  className="w-full h-12 hover:bg-[#d9d6f9] transition-all duration-300 ease-in-out flex items-center pl-4 cursor-pointer"
                  onClick={() => {
                    setRoleSelected(option.label);
                    setRole(option.label);
                    setIsActive(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={option.icon}
                    className="text-lg text-black"
                  />
                  <div className=" mx-2">{option.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button
            type="submit"
            className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 transition-all duration-300 h-11 rounded-xl w-full text-center mb-7 mt-2"
          >
            Create Account
          </button>
        </div>
        <div className=" flex justify-center mb-14">
          <p>Already have an account?</p>
          <Link to="/" className=" ml-2 text-[#3B82F6] font-semibold">
            Sign in here
          </Link>
        </div>
      </form>
      <div className="bg-blue-700 h-fit flex-shrink-0 w-fit hidden desktop:block shadow-2xl rounded-e-lg ">
        <img
          src={jobDetails}
          alt="jobInfo"
          className=" h-[40rem] my-[0.7rem]"
        />
      </div>
    </div>
  );
};

export default Signup;
