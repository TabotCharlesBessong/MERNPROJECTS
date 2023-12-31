import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import { Contact, Login } from "./pages";

const App = () => {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
