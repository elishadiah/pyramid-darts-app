import React from "react";
import { Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client";
import AuthGuard from "../utility/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Ranking from "../pages/Ranking";
import Infos from "../pages/Infos";
import Profile from "../pages/Profile";
import Schedule from "../pages/Schedule";
import Settings from "../pages/Settings";
import Result from "../pages/Result";
import GlobalEvents from "../pages/Events";
import RankingTable from "../pages/RankingTable";

// const socket = socketIO.connect("http://localhost:4000");
const socket = socketIO('https://backend.dartsfightclub.de');

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login socket={socket} />} />
      <Route path="/register" element={<Register socket={socket} />} />
      <Route element={<AuthGuard />}>
        <Route path="/home" element={<Home socket={socket} />} />
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/infos" element={<Infos socket={socket} />} />
        <Route path="/profile" element={<Profile socket={socket} />} />
        <Route path="/schedule" element={<Schedule socket={socket} />} />
        <Route path="/settings" element={<Settings socket={socket} />} />
        <Route path="/pyramid" element={<Ranking socket={socket} />} />
        <Route path="/result" element={<Result socket={socket} />} />
        <Route path="/events" element={<GlobalEvents socket={socket} />} />
        <Route path="/ranking-table" element={<RankingTable socket={socket} />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
