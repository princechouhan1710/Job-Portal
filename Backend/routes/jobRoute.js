const express = require("express");
const router = express.Router();
const { authOrg, authMiddleware } = require("../middlewares/auth.js");
const { createJob, getJob, getAllJobs,applyJob,getJobApplicants } = require("../controllers/jobProfileController.js");
router.post("/createJOb",authOrg,createJob)
router.get("/getJob", authOrg, getJob);
router.post("/apply/:id", authMiddleware, applyJob);
router.get("/allJobs", getAllJobs);
router.get("/job/:id", authMiddleware, getJobApplicants);

module.exports = router