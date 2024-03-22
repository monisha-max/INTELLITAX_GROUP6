// Load environment variables from .env file
require('dotenv').config({ path: './.auth' });


// Importing necessary libraries and modules
const express = require('express');
const path = require("path");
const hbs = require('hbs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cron = require('node-cron');
const Chart = require('chart.js/auto');

// Import transporter from config.js
const transporter = require('./config/config');

// Import connectDB function from db.js
const connectDB = require('./db/db');

// Create an Express application
const app = express();
const fs = require('fs');
app.use(express.static('public'));
app.set('view engine', 'hbs');

// Default port from environment or fallback to 4000
const PORT = process.env.PORT || 4000;

// Session middleware configuration
app.use(session({
    secret: 'your session secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Import User model
const User = require('./models/user'); 
// Import UserTaxDetails model
const UserTaxDetails = require('./models/userTaxDetails'); 

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Middleware to serve static files
app.use(express.static('public'));

// Asynchronously fetch all users from the database
async function fetchAllUsers() {
    try {
        // Retrieve all user records
        const users = await User.find({});
        // For each user, send a reminder email
        users.forEach(user => {
            sendReminderEmail(user.email, user.name);
        });
    } catch (err) {
        console.error('Error fetching users:', err);
    }
}

// Function to send a reminder email to a specific user
function sendReminderEmail(userEmail, userName) {
    // Defining email options
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: 'Tax Filing Deadline Reminder',
        text: `Dear ${userName},\n\nThis is a reminder that the tax filing deadline is approaching. Please ensure your documents are submitted in time.\n\nBest regards,\nYour Tax Filing Team`
    };
    // Send the email using the transporter
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Connect to the database
connectDB();

// Schedule cron job to fetch all users and send reminder emails
let job = cron.schedule('46 19 * * *', function() {
    fetchAllUsers();
}, null, true, 'Your_Timezone');

job.start();

// Import routes
const indexRoutes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const taxCalculationRoutes = require('./routes/taxCalculationRoutes');
const calculationRoutes = require('./routes/calculationRoutes');
const suggestionsRoutes = require('./routes/suggestionsRoutes');
const taxAnalyticsRoutes = require('./routes/taxAnalyticsRoutes');

// Use routes
app.use('/', indexRoutes);
app.use(authRoutes);
app.use(dashboardRoutes); 
app.use(taxCalculationRoutes);
app.use('/', calculationRoutes);
app.use('/', suggestionsRoutes);
app.use('/', taxAnalyticsRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
