import React from "react";
import { lazy } from "react";

import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const Dashboard = lazy(() => import("../views/Dashboard"));
const ExchangeDashboard = lazy(() => import("../views/ExchangeDashboard"));
const GoogleLogin = lazy(() => import("../views/GoogleLogin"));
const GoogleRedirect = lazy(() => import("../views/GoogleRedirect"));
const ResetPassword = lazy(() => import("./auth/ResetPassword"));
const PublicRoutes = lazy(() => import("./helper/PublicRoutes.tsx"));
const PrivateRoutes = lazy(() => import("./helper/PrivateRoutes"));
const Profile = lazy(() => import("./profile/Profile"));
const EditProfile = lazy(() => import("./profile/EditProfile"));

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export function Routers() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/prediction" element={<Dashboard />} />
        <Route path="/dashboard" element={<ExchangeDashboard />} />

        <Route
          path="/reset-password"
          element={
            <PublicRoutes>
              <ResetPassword />
            </PublicRoutes>
          }
        />
        <Route
          path="/google/login"
          element={
            <PrivateRoutes>
              <GoogleLogin />
            </PrivateRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoutes>
              <EditProfile />
            </PrivateRoutes>
          }
        />
        <Route path="/google/redirect" element={<GoogleRedirect />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}

export default Routers;
