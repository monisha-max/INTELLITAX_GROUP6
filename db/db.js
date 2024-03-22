// db.js
const mongoose = require('mongoose');
const dbName = 'TaxCollector';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://monishakollipara13:lQCoLu5hP6mIuaoj@cluster0.viy9cup.mongodb.net/TaxCollector?retryWrites=true&w=majority&appName=Cluster0' + dbName, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

module.exports = connectDB;