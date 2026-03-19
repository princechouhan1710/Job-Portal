const Organization =require( "../models/organisationModel.js");
let { hashpassword, comparepassword } = require("../utils/hash.js");
const bcrypt = require("bcryptjs");
const otp = require("../utils/otp");
const { sendEmail } = require("../utils/mail");
const { generatetoken } = require("../utils/token.js");
const { profile } = require("./candidateController.js");


const registerOrganization = async (req, res) =>{
  try {
    const {
      companyName,
      companyEmail,
      password,
      phoneNumber,
      website,
      industry,
      companySize,
      companyLocation,
      companyDescription,
    } = req.body;

    const existingUser = await Organization.findOne({ companyEmail });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOtp = otp();
    const expireTime = Date.now() + 10 * 60 * 1000;

    await sendEmail(
      companyEmail,
      "Verification OTP",
      "Check this " + newOtp,
      `
      <html>
        <body style="background:grey;color:white;padding:20px">
          <h1>Here is your OTP: ${newOtp}</h1>
        </body>
      </html>
      `
    );

    const newOrganization = new Organization({
         
      companyName,
      companyEmail,
      password:hashedPassword, 
      phoneNumber,
      website,
      industry,
      companySize,
      companyLocation,
      companyDescription,
      otp: newOtp,
      otpExpiry: expireTime,
      isVerified: false,
    });

    await newOrganization.save();

    res.status(201).json({
      success: true,
      message: "Organization Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const resendOtp = async (req, res) => {
  try {
    const { companyEmail } = req.body;

    const user = await Organization.findOne({ companyEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newOtp = otp();
    const expireTime = Date.now() + 10 * 60 * 1000;

    await sendEmail(
      companyEmail,
      "New Verification OTP",
      "Check this " + newOtp,
      `
      <html>
        <body style="background:grey;color:white;padding:20px">
          <h1>Here is your NEW OTP: ${newOtp}</h1>
        </body>
      </html>
      `
    );

    await Organization.updateOne(
      { companyEmail },
      { "$set": { otp: newOtp, otpExpiry: expireTime } }
    );

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { companyEmail, otp: userOtp } = req.body;

    const user = await Organization.findOne({ companyEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (userOtp !== user.otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    await Organization.updateOne(
      { companyEmail },
      { $set: { isVerified: true, otp: "", otpExpiry: null } }
    );

    res.status(200).json({
      success: true,
      message: "User verified successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { companyEmail, password } = req.body;

    
    const user = await Organization.findOne({ companyEmail });

    if (!user || !user.isVerified) {
      return res
        .status(401)
        .json({ success: false, message: "User not found or not verified" });
    }

    const isMatch = await comparepassword(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Please provide valid credentials" });
    }

    const token = generatetoken({ userid: user._id }, process.env.SECRETKEY, "1d");

    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
      user: {
        id: user._id,
        companyName: user.companyName,
        companyEmail: user.companyEmail,
        role: "employer",
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAllProfiles = async (req, res) => {
  try {
    const users = await Organization.find()
      .select("-password -otp -otpExpiry");  

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = { registerOrganization ,verifyOtp,resendOtp,login,profile,getAllProfiles}