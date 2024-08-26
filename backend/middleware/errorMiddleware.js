/**
 * Error handling middleware for Express.
 * 
 * @param {Object} err - The error object that contains details about the error.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the stack.
 * 
 * @returns {Object} - Responds with a JSON object containing a server error message.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).json({ msg: 'Server Error' }); // Respond with a 500 status code and a server error message
  };
  
  module.exports = errorHandler;
  