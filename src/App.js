import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";
import Infos from "./pages/Infos";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/infos" element={<Infos />} />
      </Routes>
    </div>
  );
}

export default App;
