import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import logo from '../../assets/ca-logo3.png';
import { Link } from 'react-router-dom';

const registerStyles = {
    form: {
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: '1fr 1fr',
    },
    button: {
        gridColumn: '1 / -1', 
        background: '#b27a25', 
    },
    buttonHover: {
        background: '#e98615',
    }
};

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phoneno: ''
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
            const response = await axios.post('http://localhost:8000/register', formData);
            alert(response.data.message);
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div className="card">
            <img className="logo" src={logo} alt="Logo" />
            <h2>Create Account</h2>
            <form className="form" onSubmit={handleSubmit} style={registerStyles.form}>
                <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} />
                <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <input type="tel" name="phoneno" placeholder="Phone Number" value={formData.phoneno} onChange={handleChange} />
                <button type="submit" style={registerStyles.button}>Register</button>
            </form>
            <footer>
                Already have an account? <Link to="/login">Sign in</Link>
            </footer>
        </div>
    );
};

export default Register;
