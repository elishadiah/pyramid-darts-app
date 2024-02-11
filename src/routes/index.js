import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "../utility/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Ranking from "../pages/Ranking";
import Infos from "../pages/Infos";
import Profile from "../pages/Profile";
import Schedule from "../pages/Schedule";
import Settings from "../pages/Settings";

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AuthGuard />}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/infos" element={<Infos />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ranking" element={<Ranking />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
