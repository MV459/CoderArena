const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://coderarena.onrender.com'
  : 'http://localhost:8000';

module.exports = {
  BASE_URL,
};
