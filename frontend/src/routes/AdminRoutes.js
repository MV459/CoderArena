import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Problems from '../pages/Problems/Problems';
import CreateProblem from '../pages/CreateProblem/CreateProblem';
import Problem from '../pages/Problem/Problem';  

const AdminRoutes = () => {
  const isAdmin = true;  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="problems" element={<Problems isAdmin={isAdmin} />} />
        <Route path="create-problem" element={<CreateProblem />} />
        <Route path="create-problem/:id" element={<CreateProblem />} />
        <Route path="problem/:id" element={<Problem />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
