import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import authService from "../services/auth.service";

const AuthGuard = () => {
  const authUser = authService.getAuthUser();
  return authUser && authUser.hasOwnProperty("token") ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default AuthGuard;
