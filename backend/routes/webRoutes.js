// backend/routes/webRoutes.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Serve HTML files for routes that are not API endpoints
router.get('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('index');
});

router.get('/login', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/notes', authMiddleware, (req, res) => {
  res.render('notes');
});

module.exports = router;
