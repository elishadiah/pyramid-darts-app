import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import Login from "./pages/Login";
import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </div>
  );
}

export default App;
