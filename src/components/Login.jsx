import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (!token) {
      navigate("/");
    }
  }, []);

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
      //set the token in cookies instead of local storage for security reasons (httpOnly)
      document.cookie = `token=${response.data.token}; path=/`;
      //redirect to the home page using react router
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;
