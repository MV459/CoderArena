// const express = require('express');
// const cors = require('cors');
// const { DBConnection } = require('./database/db.js');
// const User = require('./models/Users.js');
// const Problem = require('./models/Problem.js');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const problemRoutes = require('./routes/problemRoutes');

// dotenv.config();
// DBConnection();
// const app = express();
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.send('Server is running!');
// });

// app.post('/register', async (req, res) => {
//     try {
//         const { firstname, lastname, email, password, phoneno, role } = req.body;

//         if (!(firstname && lastname && email && password)) {
//             return res.status(400).send("Please enter the required fields");
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).send("User already exists!");
//         }

//         const hashPassword = bcrypt.hashSync(password, 10);

//         const user = await User.create({
//             firstname,
//             lastname,
//             email,
//             password: hashPassword,
//             phoneno,
//             role
//         });

//         const token = jwt.sign({ user_id: user._id, email, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
//         user.token = token;

//         res.status(201).json({
//             message: "You have successfully registered!",
//             user
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Registration failed. Please try again.");
//     }
// });

// const authorize = (roles = []) => {
//     if (typeof roles === 'string') {
//         roles = [roles];
//     }

//     return (req, res, next) => {
//         const token = req.cookies.jwt;

//         if (!token) {
//             return res.status(401).send('Access denied. No token provided.');
//         }

//         try {
//             const decoded = jwt.verify(token, process.env.SECRET_KEY);
//             req.user = decoded;

//             if (roles.length && !roles.includes(req.user.role)) {
//                 return res.status(403).send('Access denied. You do not have permission to perform this action.');
//             }

//             next();
//         } catch (error) {
//             res.status(400).send('Invalid token.');
//         }
//     };
// };

// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!(email && password)) {
//             return res.status(400).send("Please enter the required fields");
//         }
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).send("Invalid credentials");
//         }
//         const passwordMatch = bcrypt.compareSync(password, user.password);
//         if (!passwordMatch) {
//             return res.status(400).send("Invalid credentials");
//         }
//         const token = jwt.sign({ user_id: user._id, email, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
//         res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3600000 });
//         res.status(200).json({
//             message: "You have successfully logged in!",
//             token,
//             role: user.role // Ensure role is included in the response
//         });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// // Protect routes with role-based access control
// app.use('/api/problems', authorize(['admin', 'user']), problemRoutes);

// app.listen(8000, () => {
//     console.log('Server is running on port 8000');
// });


const express = require('express');
// const cors = require('cors');
const { DBConnection } = require('./database/db.js');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const problemRoutes = require('./routes/problemRoutes');

dotenv.config();
DBConnection();
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/problems', problemRoutes);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
