// import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { AuthCallbackPage, HomePage } from "./pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/profile" element={"User profile"} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
