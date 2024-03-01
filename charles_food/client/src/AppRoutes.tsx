// import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import { HomePage } from "./pages";

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
      <Route path="/profile" element={"User profile"} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
