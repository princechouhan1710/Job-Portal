const express = require("express");
const router = express.Router();
const { registerOrganization, resendOtp, verifyOtp, login, profile,getAllProfiles } =require( "../controllers/organizationController.js");
const { authOrg } = require("../middlewares/auth.js");

router.post("/register", registerOrganization);
router.post("/resendOtp", resendOtp);
router.post("/verifyotp", verifyOtp);
router.post("/login", login);
router.get("/profile",authOrg, profile);
router.get("/all-profiles", getAllProfiles);

module.exports = router
