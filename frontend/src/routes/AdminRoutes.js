import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Problems from '../pages/Problems/Problems';
import CreateProblem from '../pages/CreateProblem/CreateProblem';
import Problem from '../pages/Problem/Problem';  

const AdminRoutes = () => {
  const isAdmin = true;  

  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="problems" element={<Problems isAdmin={isAdmin} />} />
        <Route path="create-problem" element={<CreateProblem />} />
        <Route path="problem/:id" element={<Problem />} />
        {/* Add other admin routes here */}
      </Routes>
    </>
  );
};

export default AdminRoutes;
