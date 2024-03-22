// user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    name: String,
    email: { type: String, unique: true },
    phone: { type: Number, unique: true },
});

module.exports = mongoose.model('User', userSchema);
