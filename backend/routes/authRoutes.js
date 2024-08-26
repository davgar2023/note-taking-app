const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();

/**
 * Route to register a new user.
 * 
 * @route POST /register
 * @param {Object} req - The request object containing user details in the body.
 * @param {Object} res - The response object to send the response.
 * @returns {Object} - Returns a JSON object with a token if successful.
 */
router.post('/register', register);

/**
 * Route to log in an existing user.
 * 
 * @route POST /login
 * @param {Object} req - The request object containing login details in the body.
 * @param {Object} res - The response object to send the response.
 * @returns {Object} - Returns a JSON object with a token if successful.
 */
router.post('/login', login);

/**
 * Route to log out a user.
 * 
 * @route POST /logout
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the response.
 * @returns {Object} - Returns a success message if successful.
 */
router.post('/logout', logout);


module.exports = router;
