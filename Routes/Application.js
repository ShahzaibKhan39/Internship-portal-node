const express = require('express');
const router = express.Router();
const Application = require('../Model/Application'); 


router.post('/applications', async (req, res) => {
    try {
        const { jobRole, qualification, linkedin, github, cvLink } = req.body;
        const newApplication = new Application({ jobRole, qualification, linkedin, github, cvLink });
        await newApplication.save();
        res.status(201).json({ success: true, message: "Application saved successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.get('/applications', async (req, res) => {
    try {
        const submittals = await Application.find({}).sort({ appliedAt: -1 }); 
        res.status(200).json(submittals);
    } catch (error) {
        console.error("Failed to query applications:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
