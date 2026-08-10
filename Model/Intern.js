const mongoose = require('mongoose');

const internSchema = new mongoose.Schema({
    titleName: {
        type: String,
        required: [true, "Please fill this Place"],
        minLength: [3, "titlename should be atleast of 3 characters"],
        maxLength: [32, "maximum lenth of titlename should be 32 character"] 
    },
    jobDescription: {
        type: String,
        required: [true, "Please fill this Place"],
    },
    requireMent: {
        type: String,
        required: [true, "Please fill this Place"],
    }, 
    salery: {
        type: String,
        required: [true, "Please fill this Place"]
    }
});

module.exports = mongoose.model("intern", internSchema);
