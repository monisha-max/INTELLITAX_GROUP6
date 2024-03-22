// Adds an event listener to the form with the ID 'login-form'.
// This listener is triggered when the form is submitted
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser.

    //These lines fetch the values entered in the username and password fields, crucial for both login and registration processes
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the form is for login or registration
    const isRegisterForm = document.getElementById('name') !== null && document.getElementById('email') !== null;

    //If it's a registration form, additional details like name, email, and phone are retrieved,Then, a POST request is made to the '/register' endpoint with these details.
    if (isRegisterForm) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        //Makes an HTTP POST request to the server's '/register' endpoint.
        //Sends the user input (name, email, phone, username, password) in the request body.
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, phone, username, password }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Display registration message
            // Redirect to login page after registration
            window.location.href = '/login';
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else { 
         // Handles the login process if the form is not for registration.
        // Makes an HTTP POST request to the server's '/login' endpoint.
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),// Sends the username and password in the request body
        })
        //After registration, the user is alerted with a message from the server, and then redirected to the login page. Error handling is also provided.
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Display login message
            // Redirect to tax year selection page after successful login
            if (data.success) {
                window.location.href = '/select-tax-year';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
