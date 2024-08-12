const express = require('express');
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
const corsOptions={
    origin:['http://localhost:3000','https://coder-arena.vercel.app']
}
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/problems', problemRoutes);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
