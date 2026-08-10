const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobRole: {
        type: String,
        required: [true, "Job role is required"]
    },
    qualification: {
        type: String,
        required: [true, "Qualification field is required"]
    },
    linkedin: {
        type: String,
        required: [true, "LinkedIn link is required"]
    },
    github: {
        type: String,
        required: [true, "GitHub link is required"]
    },
    cvLink: {
        type: String,
        required: [true, "CV download link is required"]
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Application", applicationSchema);
