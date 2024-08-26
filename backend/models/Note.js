const mongoose = require('mongoose');

// Define the Note schema for MongoDB
const NoteSchema = new mongoose.Schema({
  // Reference to the User model (required field)
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Title of the note (required field)
  title: { type: String, required: true },
  // Content of the note (required field)
  content: { type: String, required: true },
 
}, { timestamps: true } );

// Export the Note model based on the schema
module.exports = mongoose.model('Note', NoteSchema);
