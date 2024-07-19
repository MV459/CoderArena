
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Loginpage/Login';
import Register from '../pages/Register/Register';

const AuthRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default AuthRoutes;
