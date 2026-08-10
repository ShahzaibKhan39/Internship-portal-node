const mongoose = require('mongoose');

function connectDB() {
  const dbUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/internship-portfolio";

  mongoose.connect(dbUri)
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch(err => {
      console.error(" Database connection failed error details:", err.message);
    });
}

module.exports = connectDB;
