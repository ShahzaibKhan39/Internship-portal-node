const express = require("express");
const {
  createJob, getInternships, getsingleInternship, deleteSingleInternship, updateSingleInternship
} = require("../controllers/intern");

const router = express.Router();

router.post("/createJob", createJob);
router.get("/internships", getInternships);
router.get("/internships/:id", getsingleInternship);
router.delete("/internships/:id", deleteSingleInternship);
router.patch("/internships/:id", updateSingleInternship);

module.exports = router;
