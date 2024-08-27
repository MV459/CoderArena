import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/ca-logo3.png';
import styles from './Register.module.css';
import { BASE_URL } from '../../config';
import Swal from 'sweetalert2';

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
        phoneno: '',
        role: 'user'
    });

    const navigate = useNavigate();

    const onlyLetters = (str) => /^[A-Za-z\s]*$/.test(str);
    const onlyNumbers = (str) => /^[0-9]*$/.test(str);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = () => {
        let valid = true;

        if (!onlyLetters(formData.firstname)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Incorrect first name',
            });
            valid = false;
        }
        if (!onlyLetters(formData.lastname)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Incorrect last name',
            });
            valid = false;
        }
        if (!emailRegex.test(formData.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Incorrect email',
            });
            valid = false;
        }
        if (formData.password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Password must be at least 6 characters long',
            });
            valid = false;
        }
        if (!onlyNumbers(formData.phoneno) || formData.phoneno.length !== 10) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Incorrect phone number',
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
            const response = await axios.post(`${BASE_URL}/api/users/register`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Registration successful! Please log in.',
                }).then(() => {
                    navigate('/login');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'Registration failed',
                });
            }
        } catch (error) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'Registration failed',
            });
        }
    };

    return (
        <div className={styles['register-background']}>
            <div className={styles.card}>
                <img className={styles.logo} src={logo} alt="Logo" />
                <h2>Join Coder Arena</h2>
                <form className={styles.form} onSubmit={handleSubmit} style={registerStyles.form}>
                    <input 
                        type="text" 
                        name="firstname" 
                        placeholder="First Name" 
                        value={formData.firstname} 
                        onChange={handleChange} 
                        required 
                    />

                    <input 
                        type="text" 
                        name="lastname" 
                        placeholder="Last Name" 
                        value={formData.lastname} 
                        onChange={handleChange} 
                        required 
                    />

                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
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

                    <input 
                        type="text" 
                        name="phoneno" 
                        placeholder="Phone Number" 
                        value={formData.phoneno} 
                        onChange={handleChange} 
                    />

                    <button type="submit" style={registerStyles.button}>Sign Up</button>
                </form>
                <footer>
                    Already have an account? <Link to="/login">Sign in</Link>
                </footer>
            </div>
        </div>
    );
};

export default Register;
