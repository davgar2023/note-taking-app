/**
 * Validates an email format.
 * 
 * @param {string} email - The email address to be validated.
 * @returns {boolean} - Returns true if the email is in a valid format, false otherwise.
 */
const validateEmail = (email) => {
    // Regular expression for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Test the email against the regex pattern
    return emailRegex.test(email);
}

/**
 * Validates a password format.
 * 
 * @param {string} password - The password to be validated.
 * @returns {boolean} - Returns true if the password meets the criteria (minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number).
 */
const validatePassword = (password) => {
    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    
    // Test the password against the regex pattern
    return passwordRegex.test(password);
}

/**
 * Validates a username format.
 * 
 * @param {string} username - The username to be validated.
 * @returns {boolean} - Returns true if the username contains only alphanumeric characters and is at least 3 characters long.
 */
const validateUsername = (username) => {
    // Regular expression for username validation
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/; // Alphanumeric characters, minimum 3 characters
    
    // Test the username against the regex pattern
    return usernameRegex.test(username);
}
