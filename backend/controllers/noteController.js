const Note = require('../models/Note');

/**
 * Adds a new note for the authenticated user.
 * 
 * @param {Object} req - The request object containing note details in the body.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */
exports.addNote = async (req, res) => {
  const { title, content } = req.body;
  
  try {
    // Create a new note with the user's ID, title, and content
    const newNote = new Note({
      user: req.user.id,
      title,
      content,
    });

    // Save the note to the database
    await newNote.save();
    res.status(200).json(newNote);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Retrieves all notes for the authenticated user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */
exports.getNotes = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

    // Calculate the skip value
    const skip = (page - 1) * limit;

    // Get the total count for pagination info
    const totalNotes = await Note.countDocuments({ user: req.user.id });


    // Find all notes associated with the user's ID  with pagination
    const notes = await Note.find({ user: req.user.id })
                        .skip( skip )
                        .limit( limit );

    // Return notes and pagination info                    
    res.status(200).json({
      notes,
      totalPages: Math.ceil(totalNotes / limit),
      currentPage: page,
    });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Updates a specific note for the authenticated user.
 * 
 * @param {Object} req - The request object containing the note ID in the params and updated details in the body.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */
exports.editNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  
  try {
    // Find the note by ID
    const note = await Note.findById(id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update note details
    note.title = title;
    note.content = content;
    await note.save();
    res.status(200).json(note);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * Deletes a specific note for the authenticated user.
 * 
 * @param {Object} req - The request object containing the note ID in the params.
 * @param {Object} res - The response object to send the response.
 * @returns {void}
 */
exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the note by ID
    const note = await Note.findById(id);
    if (!note || note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Remove the note from the database
    await Note.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Note removed' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ msg: 'Server error' });
  }
};
