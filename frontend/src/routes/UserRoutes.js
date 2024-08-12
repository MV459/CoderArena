import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Problems from '../pages/Problems/Problems';
import Problem from '../pages/Problem/Problem';
const UserRoutes = () => {
  const isAdmin = false; 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="problems" element={<Problems isAdmin={isAdmin} />} />
        <Route path="problem/:id" element={<Problem />}/>
      </Routes>
    </>
  );
};

export default UserRoutes;
