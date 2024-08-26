const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User schema for MongoDB
const UserSchema = new mongoose.Schema({
  // User's name (required field)
  name: { type: String, required: true },
  // User's email (required field, must be unique)
  email: { type: String, required: true, unique: true },
  // User's password (required field)
  password: { type: String, required: true },
});

// Pre-save hook to hash the password before saving to the database
UserSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or is new
  if (!this.isModified('password')) return next();

  try {
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    // Proceed to save the user document
    next();
  } catch (err) {
    // Pass any errors to the next middleware
    next(err);
  }
});

// Export the User model based on the schema
module.exports = mongoose.model('User', UserSchema);
