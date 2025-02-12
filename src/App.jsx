import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

import Layout from "./components/Layouts";           
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Sell from "./pages/Sell";

export default function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
        <Route path="/sell" element={<Sell />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}
