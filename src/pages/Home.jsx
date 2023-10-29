import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (!token) {
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    document.cookie = `token=; path=/; expires= new Date(0)`;
    window.location.href = "/";
  };
  return (
    <>
      <div>Under Construction</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
