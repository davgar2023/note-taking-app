const express = require('express');
const { addNote, getNotes, editNote, deleteNote } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * Route to add a new note.
 * 
 * @route POST /notes
 * @param {Object} req - The request object containing note details in the body.
 * @param {Object} res - The response object to send the response.
 * @middleware authMiddleware - Middleware to authenticate the user.
 * @returns {Object} - Returns the newly created note.
 */
router.post('/', authMiddleware, addNote);

/**
 * Route to get all notes for the authenticated user.
 * 
 * @route GET /notes
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the response.
 * @middleware authMiddleware - Middleware to authenticate the user.
 * @returns {Array} - Returns an array of notes for the authenticated user.
 */
router.get('/', authMiddleware, getNotes);

/**
 * Route to edit a specific note by ID.
 * 
 * @route PUT /notes/:id
 * @param {Object} req - The request object containing the note ID in the params and updated details in the body.
 * @param {Object} res - The response object to send the response.
 * @middleware authMiddleware - Middleware to authenticate the user.
 * @returns {Object} - Returns the updated note.
 */
router.put('/:id', authMiddleware, editNote);

/**
 * Route to delete a specific note by ID.
 * 
 * @route DELETE /notes/:id
 * @param {Object} req - The request object containing the note ID in the params.
 * @param {Object} res - The response object to send the response.
 * @middleware authMiddleware - Middleware to authenticate the user.
 * @returns {Object} - Returns a confirmation message if the note is removed.
 */
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;
