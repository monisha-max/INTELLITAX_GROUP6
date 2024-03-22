// config.js
require('dotenv').config({ path: './.auth' });

const nodemailer = require('nodemailer');

// Set up nodemailer transporter for email services
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = transporter;
