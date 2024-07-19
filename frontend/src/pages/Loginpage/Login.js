import { Link } from 'react-router-dom';
import logo from '../../assets/ca-logo3.png';
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
const loginStyles = {
  form: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: '1fr', 
  },
  button: {
    background: '#b27a25', 
  },
  buttonHover: {
    background: '#d18b3d', 
  }
};
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', formData);
            alert(response.data.message);
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="card">
            <img className="logo" src={logo} alt="Logo" />
            <h2>Welcome Back to Coder Arena</h2>
            <form className="form" onSubmit={handleSubmit} style={loginStyles.form}>
                <input type="email" name="email" placeholder="Username" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button type="submit" style={loginStyles.button}>Sign In</button>
            </form>
            <footer>
                Need an account? <Link to="/register">Sign up</Link>
            </footer>
        </div>
    );
};

export default Login;
