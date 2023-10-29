import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split("=")[1];
    if (!token) {
      navigate("/signup");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
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
      });
      setData(response.data);
      //set the token in cookies instead of local storage for security reasons (httpOnly)
      document.cookie = `token=${response.data.token}; path=/`;
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <label>
        Role:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select a role</option>
          <option value="recruiter">Recruiter</option>
          <option value="jobSeeker">Job Seeker</option>
        </select>
      </label>
      <br />
      <button>Sign Up</button>
      <Link to="/">Log In</Link>
    </form>
  );
};

export default Signup;
