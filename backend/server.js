require('dotenv').config();
const app = require('./app');


// Get the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

/**
 * Start the server
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
