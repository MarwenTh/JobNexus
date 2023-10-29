import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Login from "./components/Login";
import Home from "./pages/Home";
import Signup from "./components/Signup";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
