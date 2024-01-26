import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartPage, FoodPage, HomePage, LoginPage, RegisterPage } from "./pages";
import AuthRoute from "./components/AuthRoute/AuthRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/checkout"
        element={<AuthRoute>"Hello my checkout"</AuthRoute>}
      />
    </Routes>
  );
};

export default AppRoutes;
