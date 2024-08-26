// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the login button element
    const loginButton = document.getElementById('loginButton');

    // Add a click event listener to the login button
    loginButton.addEventListener('click', () => {
        // Get form data: name, email, and password values entered by the user
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Get the elements where error messages will be displayed
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');

        // clean messages 
            passwordError.textContent = ''; 
            passwordError.style.display = 'none';
            nameError.textContent = ''; 
            nameError.style.display = 'none'; 
            emailError.textContent = ''; 
            emailError.style.display = 'none'; 

        // Variable to track if there are any validation errors
        let hasError = false;

        // Validate the name: Check if the name is empty or doesn't meet the criteria
        if (name === '' || !validateUsername(name)) {
            nameError.textContent = 'Name must be at least 3 characters.'; // Set error message
            nameError.style.display = 'block'; // Show the error message
            hasError = true; // Indicate an error was found
        }

        // Validate the email: Check if it's empty or invalid
        if (email === '' || !validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email address.'; // Set error message
            emailError.style.display = 'block'; // Show the error message
            hasError = true; // Indicate an error was found
        }

        // Validate the password: Check if it's empty or doesn't meet the security requirements
        if (password === '' || !validatePassword(password)) {
            passwordError.textContent = 'Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number'; // Set error message
            passwordError.style.display = 'block'; // Show the error message
            hasError = true; // Indicate an error was found
        }

        // If there are no validation errors, proceed to send data to the server
        if (!hasError) {
            // Make a POST request using Axios to send the registration data to the server
            axios.post('/api/auth/register', {
                name: name,
                email: email,
                password: password
            })
            .then(response => {
                // Handle success: If registration is successful, display a success message
                console.log('Registration successful:', response.data); // Log the response data
                
                feedbackBadge.textContent = response.data.msg || 'Registration successful! Redirecting...'; // Set success message
                feedbackBadge.classList.remove('bg-danger'); // Remove any previous error styles
                feedbackBadge.classList.add('bg-success'); // Add success styles
                feedbackBadge.classList.remove('d-none'); // Make feedback visible

                // Redirect the user to the '/notes' page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/notes';
                }, 2000);
            })
            .catch(error => {
                // Handle error: If there's an error during the request, display an error message
                feedbackBadge.textContent = error.response.data.msg || 'An error occurred. Please try again.'; // Set error message
                feedbackBadge.classList.remove('bg-success'); // Remove success styles if present
                feedbackBadge.classList.add('bg-danger'); // Add error styles
                feedbackBadge.classList.remove('d-none'); // Make feedback visible
            });
        }
    });
});
