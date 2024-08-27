import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/ca-logo3.png';
import styles from './Login.module.css';
import { BASE_URL } from '../../config';
import Swal from 'sweetalert2';

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

    const navigate = useNavigate();

    const validate = () => {
        const { email, password } = formData;
        let valid = true;

        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Email is required',
            });
            valid = false;
        } else if (!password) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Password is required',
            });
            valid = false;
        }

        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/users/login`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                const { role } = response.data;

                localStorage.setItem('userRole', role);

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                }).then(() => {
                    if (role === 'admin') {
                        navigate('/admin/create-problem');
                    } else {
                        navigate('/problems');
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid credentials',
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'An error occurred during login',
            });
        }
    };

    return (
        <div className={styles['login-background']}>
            <div className={styles.card}>
                <img className={styles.logo} src={logo} alt="Logo" />
                <h2>Welcome Back to Coder Arena</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Username" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit" style={loginStyles.button}>Sign In</button>
                </form>
                <footer>
                    Need an account? <Link to="/register">Sign up</Link>
                </footer>
            </div>
        </div>
    );
};

export default Login;
