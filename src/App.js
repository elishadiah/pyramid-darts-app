import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <div className="App  h-screen overflow-auto bg-gray-100 dark:bg-main-bg-color">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </div>
  );
}

export default App;
