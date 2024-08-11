const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
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

        const token = jwt.sign({ user_id: user._id, email, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
        user.token = token;

        res.status(201).json({
            message: "You have successfully registered!",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Registration failed. Please try again.");
    }
};

exports.login = async (req, res) => {
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
        const token = jwt.sign({ user_id: user._id, email, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(200).json({
            message: "You have successfully logged in!",
            token,
            user
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send("Internal Server Error");
    }
};
