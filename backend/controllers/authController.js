const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/auth'); // Import generateToken function


/**
 * Registers a new user.
 * Checks if the user already exists; if not, creates a new user and returns a JWT token.
 * 
 * @param {Object} req - The request object containing user details in the body.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ success: false, msg: 'User already exists' });

    // Create a new user
    user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user); // Generate JWT token
    // Send the token as the response
    res.cookie('jwtToken', token, { httpOnly: true, secure: false, sameSite: 'Strict'  });
    res.status(200).json({ success: true , msg: `Welcome : ${user.name }`});
  } catch (err) {
    // Handle server errors
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

/**
 * Logs in a user.
 * Verifies the user's credentials and returns a JWT token if they are valid.
 * 
 * @param {Object} req - The request object containing login details in the body.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, msg: 'Invalid credentials' });

    // Check if the provided password matches the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, msg: 'Invalid credentials' });

    const token = generateToken(user); // Generate JWT token
    // Send the token as the response
    res.cookie('jwtToken', token, { httpOnly: true, secure: false, sameSite: 'Strict' });
    res.status(200).json({ success: true, msg: `Welcome : ${user.name }`});
  } catch (err) {
    // Handle server errors
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};


/**
 * Logout a user by clearing the authentication token.
 * 
 * @route POST /logout
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the response.
 * @returns {Object} - Returns a success message if successful.
 */
exports.logout = (req, res) => {
  try {
    // Clear the cookie where the token is stored
    res.clearCookie('jwtToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};