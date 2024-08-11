const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
// const authMiddleware = require('../middleware/authorize');
const authorize = require('../middleware/authorize');

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password, phoneno, role } = req.body;

        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter the required fields");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists!");
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
            phoneno,
            role
        });

        const token = jwt.sign(
            { user_id: user._id, email, role: user.role }, 
            process.env.SECRET_KEY, 
            { expiresIn: "1h" }
        );
        res.cookie("jwt", token, { httpOnly: true, secure: false, maxAge: 3600000 }); // Set `secure: false` for local testing
        res.status(201).json({
            message: "You have successfully registered!",
            token,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration failed. Please try again.");
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Please enter the required fields");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid credentials");
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send("Invalid credentials");
        }

        const token = jwt.sign(
            { user_id: user._id, email, role: user.role,user:user }, 
            process.env.SECRET_KEY, 
            { expiresIn: "1h" }
        );
        res.cookie("jwt", token, { httpOnly: true, secure: false, maxAge: 3600000 }); // Set `secure: false` for local testing
        res.status(200).json({
            message: "You have successfully logged in!",
            token,
            role: user.role 
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send("Internal Server Error");
    }
});

// Protected route to get the current user data
// router.get('/me', authMiddleware(), async (req, res) => {
//     try {
//         const userId = req.user.user_id;

//         const user = await User.findById(userId).select('-password'); 

//         if (!user) {
//             return res.status(404).json({ msg: 'User not found' });
//         }

//         res.json(user);
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         res.status(500).json({ msg: 'Server error' });
//     }
// });
router.get('/me', authorize,async (req, res) => {
    res.json({user:req.user});
  });
module.exports = router;
