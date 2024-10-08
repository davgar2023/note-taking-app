const { verifyToken } = require('../config/auth'); // Import generateToken function
/**
 * Middleware function to authenticate JWT tokens.
 * Checks if a token is provided in the 'x-auth-token' header or cookie session and verifies it.
 * If the token is valid, the user data is attached to the request object.
 * If the token is not provided or invalid, an error response is sent.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * @returns {void}
 */
const authMiddleware = (req, res, next) => {
  // Retrieve the token from the 'x-auth-token' header or cookie session
  //const token = req.header('x-auth-token');
  const token = req.cookies.jwtToken;
  
  // If no token is found, send a 401 Unauthorized response
  if (!token) {
    // Check if the request is an API request
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    } else {
      // Otherwise, redirect to login page
      return res.redirect('/login');
    }
  }//return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify the token using the JWT secret
    const decoded = verifyToken(token);//jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user data to the request object
    req.user = decoded.user;
    
    // Call the next middleware function in the stack
    next();
  } catch (err) {

      // If the token is invalid
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
      return res.status(401).json({ msg: 'Token is not valid' });
    } else {
      // Otherwise, redirect to login page
      return res.redirect('/login');
    }
  }
  
};

module.exports = authMiddleware;
