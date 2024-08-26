const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generates a JWT token for the given user.
 * 
 * @param {Object} user - The user object containing user details.
 * @param {string} user.id - The user's unique ID.
 * 
 * @returns {string} - The generated JWT token.
 */
const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

/**
 * Verifies the given JWT token.
 * 
 * @param {string} token - The JWT token to verify.
 * 
 * @returns {Object|null} - The decoded token if valid, or null if invalid.
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // Return null if token is invalid
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
