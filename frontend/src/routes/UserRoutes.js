// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Problems from '../pages/Problems/Problems';
// import Navbar from '../components/Navbar';
// const UserRoutes = () => {
//   return (
//     <div>
//     <Navbar />
//     <Routes>
//       <Route path="/problems" element={<Problems />} />
//       {/* Add other routes here */}
//     </Routes>
//   </div>
//   );
// };

// export default UserRoutes;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Problems from '../pages/Problems/Problems';
import Problem from '../pages/Problem/Problem';
const UserRoutes = () => {
  const isAdmin = false;  // Set to false for user routes

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="problems" element={<Problems isAdmin={isAdmin} />} />
        <Route path="problem/:id" element={<Problem />}/>
      </Routes>
    </>
  );
};

export default UserRoutes;
