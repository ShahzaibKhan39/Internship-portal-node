const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please fill this Place"],
        minLength: [3, "Username should be at least 3 characters"],
        maxLength: [32, "Maximum length of username should be 32 characters"] 
    },
    email: {
        type: String,
        required: [true, "Please fill this Place"],
        minLength: [8, "Email should be at least 8 characters"],
        maxLength: [32, "Maximum length of email should be 32 characters"] 
    },
    password: { 
        type: String,
        required: [true, "Please fill this Place"],
        minLength: [3, "Password should be at least 3 characters"],
        maxLength: [100, "Hashed password exceeds maximum storage limit"] 
    },
    // Role field to differentiate Users and Admins
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

const authModel = mongoose.model('auth', authSchema)
module.exports = authModel
