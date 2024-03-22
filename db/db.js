// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectDB;
