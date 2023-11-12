import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/userContexts";
import { jwtDecode } from "jwt-decode";

// const isCookieExpired = (cookieName) => {
//   const cookieValue = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith(`${cookieName}=`));

//   if (!cookieValue) {
//     console.log("cookie doesn't exist");
//     return true; // cookie doesn't exist
//   }

//   const [, expires] = cookieValue.split("=");

//   if (!expires) {
//     console.log("cookie doesn't have expiration date");
//     return true; // cookie doesn't have expiration date
//   }

//   const expirationDate = new Date(expires);
//   const currentDate = new Date();

//   return expirationDate < currentDate;
// };

const Home = () => {
  const navigate = useNavigate();
  const { userId } = useUser();

  const checkTokens = () => {
    const token = document.cookie.split("=")[1];
    if (token) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    checkTokens();
    const token = document.cookie.split("=")[1];
    if (!token || isTokenExpired(token)) {
      document.cookie = "token=; path=/; expires=" + new Date(0);
      navigate("/");
    }
  }, [navigate]);

  const removeTokens = () => {
    localStorage.removeItem("userId");
    document.cookie = "token=; path=/; expires=" + new Date(0);
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/logout/${userId}`);
      removeTokens();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <div>Under Construction</div>
      <div>{userId}</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
