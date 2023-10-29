import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Login from "./components/Login";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
