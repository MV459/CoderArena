const express = require('express');
const cors = require('cors');
const { DBConnection } = require('./database/db.js');
const User = require('./models/Users.js');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

dotenv.config();
DBConnection();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password, phoneno } = req.body;
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter the required fields");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists!");
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
            firstname, lastname, email, password: hashPassword, phoneno
        });
        const token = jwt.sign({ user_id: user._id, email }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.status(201).json({
            message: "You have successfully registered!",
            user,
            token
        });
    } catch (error) {
        console.error('Error during registration:', error);  // Log the error
        res.status(500).send("Internal Server Error");
    }
});

app.post('/login', async (req, res) => {
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
        const token = jwt.sign({ user_id: user._id, email }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(200).json({
            message: "You have successfully logged in!",
            token,
            user
        });
    } catch (error) {
        console.error('Error during login:', error);  // Log the error
        res.status(500).send("Internal Server Error");
    }
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
