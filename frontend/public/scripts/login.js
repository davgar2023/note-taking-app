// login.js

// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the login button element
    const loginButton = document.getElementById('loginButton');

    // Add a click event listener to the login button
    loginButton.addEventListener('click', () => {
        // Get the values entered in the email and password fields, and trim any whitespace
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        // Get the elements where error messages will be displayed
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        // Clear any previous error messages and hide them
        emailError.style.display = 'none';
        emailError.textContent = '';
        passwordError.style.display = 'none';
        passwordError.textContent = '';

        // Initialize a variable to track if any errors exist
        let hasError = false;

        // Validate the email field: Check if it's empty or if it's not a valid email format
        if (email === '' || !validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email address.'; // Show error message
            emailError.style.display = 'block'; // Make the error message visible
            hasError = true; // Mark that an error was found
        }

        // Validate the password field: Check if it's empty or if it's shorter than 8 characters
        if (password === '' || password.length < 6) {
            passwordError.textContent = 'Password must be at least 8 characters.'; // Show error message
            passwordError.style.display = 'block'; // Make the error message visible
            hasError = true; // Mark that an error was found
        }

        // If no errors are found, send the login data to the server
        if (!hasError) {
            // Make a POST request to the server using Axios, sending the email and password
            axios.post('/api/auth/login', {
                email: email,
                password: password
            })
            .then(response => {
                // If the request is successful, display a success message
                feedbackBadge.textContent = response.data.msg || 'Login successful! Redirecting...';
                feedbackBadge.classList.remove('bg-danger'); // Remove any error class
                feedbackBadge.classList.add('bg-success'); // Add success class for styling
                feedbackBadge.classList.remove('d-none'); // Show the feedback message

                // Redirect the user to the '/notes' page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/notes';
                }, 2000);
            })
            .catch(error => {
                // If an error occurs during the request, display an error message
                feedbackBadge.textContent = error.response.data.msg || 'An error occurred. Please try again.';
                feedbackBadge.classList.remove('bg-success'); // Remove success class if present
                feedbackBadge.classList.add('bg-danger'); // Add error class for styling
                feedbackBadge.classList.remove('d-none'); // Show the feedback message
            });
        }
    });
});
