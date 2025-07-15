import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import Register from './pages/Register/Register';
import Home from './pages/Homepage/Home';
import Login from './pages/Loginpage/Login';  
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};
export default App;
