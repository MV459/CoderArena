import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Problems from '../pages/Problems/Problems';
import Problem from '../pages/Problem/Problem';
import Home from '../pages/Homepage/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Footer from '../components/Footer';
const UserRoutes = () => {
  const isAdmin = false; 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="problems" element={<Problems isAdmin={isAdmin} />} />
        <Route path="problem/:id" element={<Problem />}/>
      </Routes>
      <Footer />
    </>
  );
};

export default UserRoutes;
