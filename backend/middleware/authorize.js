const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authorize = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log(token)

  if (!token) {
    return res.status(401).send({ error: 'Please authenticate......' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded)
    const user = await User.findOne({ _id: decoded.user_id });
    console.log(user)
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authorize;
