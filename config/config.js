// config.js

const nodemailer = require('nodemailer');

// Set up nodemailer transporter for email services
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
        user: "intellitax9@gmail.com",
        pass: "odii qzrc gwpt rjod"
    }
});

module.exports = transporter;
