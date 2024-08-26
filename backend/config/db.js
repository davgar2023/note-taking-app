require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
/**
 *  libraries:
 * Import the mongoose library for MongoDB interaction
 * Import dotenv to load environment variables from a .env file
 */





/**
 * Connects to MongoDB using Mongoose.
 * Retrieves the MongoDB URI from environment variables and uses it to establish a connection.
 * Includes error handling to manage connection issues.
 *
 * @async
 * @function connectDB
 * @throws Will exit the process with a non-zero status code if the connection fails.
 */


const connectDB  = async () =>{

  await  mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {console.error('MongoDB connection error:', err);
    process.exit(1);
});
}

// Export the connectDB function to be used in other parts of the application
module.exports = connectDB;
