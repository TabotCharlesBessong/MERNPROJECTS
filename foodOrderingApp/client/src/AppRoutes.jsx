import React from "react";
import { Routes,Route } from "react-router-dom";
import { FoodPage, HomePage } from "./pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/food/:id" element={<FoodPage />} />
      <Route path="/cart" element={"Cart page"} />
    </Routes>
  )
}

export default AppRoutes