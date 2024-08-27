import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/ca-logo3.png'; 

const Navbar = () => {
  const userRole = localStorage.getItem('userRole');

  const navStyle = {
    backgroundColor: '#1f1e1b',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '20px'
  };

  const aStyle = {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease'
  };

  const aHoverStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  };

  const logoStyle = {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '20px'
  };

  return (
    <nav style={navStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />

      <ul style={ulStyle}>
      <li>
          <Link 
            to="/home" 
            style={aStyle} 
            onMouseEnter={(e) => e.target.style.backgroundColor = aHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            style={aStyle} 
            onMouseEnter={(e) => e.target.style.backgroundColor = aHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            About 
          </Link>
        </li>
        <li>
          <Link 
            to="/problems" 
            style={aStyle} 
            onMouseEnter={(e) => e.target.style.backgroundColor = aHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Problems
          </Link>
        </li>
        {userRole === 'admin' && (
          <li>
            <Link 
              to="/admin/create-problem" 
              style={aStyle} 
              onMouseEnter={(e) => e.target.style.backgroundColor = aHoverStyle.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Create Problem
            </Link>
          </li>
        )}
        <li>
          <Link 
            to="/contact" 
            style={aStyle} 
            onMouseEnter={(e) => e.target.style.backgroundColor = aHoverStyle.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Contact
          </Link>
        </li>
      </ul>
      <Link 
        to="/login" 
        style={{ ...aStyle, marginLeft: 'auto' }} 
        onMouseEnter={(e) => e.target.style.backgroundColor = aHoverStyle.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
