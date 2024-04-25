import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "../helper/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Ranking from "../pages/Ranking";
import Infos from "../pages/Infos";
import ProfileSummary from "../pages/Profile/ProfileSummary";
import ProfileAchievements from "../pages/Profile/ProfileAchievements";
import Schedule from "../pages/Schedule";
import Settings from "../pages/Settings";
import Result from "../pages/Result";
import GlobalEvents from "../pages/Events";
import RankingTable from "../pages/RankingTable";
import ResetPassword from "../pages/ResetPassword";
import RetypePassword from "../pages/RetypePassword";
import ProfileAchievementsPersonal from "../pages/Profile/ProfileAchievementsPersonal";
import ProfileAchievementsPyramid from "../pages/Profile/ProfileAchievementsPyramid";

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/retype-password/:id/:token" element={<RetypePassword />} />
      <Route element={<AuthGuard />}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/infos" element={<Infos />} />
        <Route path="/profile-summary" element={<ProfileSummary />} />
        <Route
          path="/profile-achievements-participation"
          element={<ProfileAchievements />}
        />
        <Route
          path="/profile-achievements-personal"
          element={<ProfileAchievementsPersonal />}
        />
        <Route
          path="/profile-achievements-pyramid"
          element={<ProfileAchievementsPyramid />}
        />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pyramid" element={<Ranking />} />
        <Route path="/result" element={<Result />} />
        <Route path="/events" element={<GlobalEvents />} />
        <Route path="/ranking-table" element={<RankingTable />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
