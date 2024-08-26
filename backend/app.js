const express = require('express');
const connectDB = require('./config/db');
const path = require('path'); 
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const errorHandler = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const webRoutes = require('./routes/webRoutes');

// Connect to the MongoDB database
connectDB();

/**
 * Middleware configuration
 */
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));// Parse URL-encoded bodies
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5000', credentials: true })); // Adjust the origin to your frontend URL

// Middleware to set Content-Security-Policy header
/*app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");
  next();
});*/

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));


/**
 * Route handlers
 */
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/notes', noteRoutes); // Note routes



/**
 * Serve HTML files for routes that are not API endpoints
 */
app.use('/', webRoutes);

/*
*  Error Handlers
*/
app.use(errorHandler);

module.exports = app; 
