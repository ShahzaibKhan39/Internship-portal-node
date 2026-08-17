const mongoose = require('mongoose');

function connectDB() {
  const dbUri = process.env.MONGO_URI || "mongodb+srv://gh4737400_db_user:<db_password>@internship-portal.usvhfug.mongodb.net";

  mongoose.connect(dbUri)
    .then(() => {
      console.log("Successfully connected to MongoDB");
    })
    .catch(err => {
      console.error("Database connection failed error details:", err.message);
    });
}

module.exports = connectDB;