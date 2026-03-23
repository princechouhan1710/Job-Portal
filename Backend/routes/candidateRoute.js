const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload.js");

const {
  registerCandidate,
  resendOtp,
  verifyOtp,
  login,
  profile,getAllProfiles
} = require("../controllers/candidateController");

const {auth} =require("../middlewares/auth.js")

router.post("/register",  upload.fields([{ name: "image", maxCount: 1 },{ name: "resume", maxCount: 1 },]), registerCandidate);
router.post("/resendotp", resendOtp);
router.post("/verifyotp", verifyOtp);
router.post("/login", login);
router.get("/profile",auth, profile);
router.get("/all-profiles", getAllProfiles);

module.exports = router;