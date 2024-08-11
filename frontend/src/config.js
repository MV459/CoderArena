const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://coderarena-xs4x.onrender.com'
  : 'http://localhost:8000';

module.exports = {
  BASE_URL,
};
