const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Login page route
router.get('/login', (req, res) => {
    res.render('login'); // Render the login page
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        // Set session ID and redirect to dashboard
        req.session.userId = user._id;
        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred' });
    }
});

// Registration page route
router.get('/register', (req, res) => {
    res.render('register'); // Render the registration page
});

// Registration route
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, username, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).send({ message: "Passwords do not match" });
        }

        // Check if username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Username is already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({ name, email, phone, username, password: hashedPassword });
        await user.save();

        res.redirect('/login'); // Redirect to login page after registration
    } catch (error) {
        // Handle duplicate key errors for email and phone
        if (error.code === 11000 && error.keyPattern.email) {
            return res.status(400).send({ message: 'Email already exists' });
        } else if (error.code === 11000 && error.keyPattern.phone) {
            return res.status(400).send({ message: 'Phone number already exists' });
        } else {
            console.error(error);
            return res.status(500).send({ message: 'An error occurred' });
        }
    }
});

module.exports = router;
