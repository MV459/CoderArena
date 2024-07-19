import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthRoutes from './routes/AuthRoutes';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthRoutes />
      </div>
    </Router>
  );
}

export default App;
