import React from "react";
import { Route, Routes } from "react-router-dom";
import io from 'socket.io-client';
import AuthGuard from "../utility/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Ranking from "../pages/Ranking";
import Infos from "../pages/Infos";
import Profile from "../pages/Profile";
import Schedule from "../pages/Schedule";
import Settings from "../pages/Settings";

// const socket = io('http://localhost:4000');
const socket = io('https://whale-app-osu76.ondigitalocean.app');


const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AuthGuard />}>
        <Route path="/home" element={<Home socket={socket} />} />
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/infos" element={<Infos socket={socket} />} />
        <Route path="/profile" element={<Profile socket={socket} />} />
        <Route path="/schedule" element={<Schedule socket={socket} />} />
        <Route path="/settings" element={<Settings socket={socket} />} />
        <Route path="/ranking" element={<Ranking socket={socket} />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
