const Candidate = require("../models/candidateModel");
let { hashpassword, comparepassword } = require("../utils/hash.js");
const bcrypt = require("bcryptjs");
const otp = require("../utils/otp");
const { sendEmail } = require("../utils/mail");
const { generatetoken } = require("../utils/token.js");
let path =require("path")
console.log("BODY:", req.body);
console.log("FILES:", req.files);
const registerCandidate = async (req, res) => {
  try {
const body = req.body || {};

const {
  name,
  email,
  password,
  phone,
  city,
  state,
  country,
  category,
  skills,
  availability,
  age,
  Gender,
  Language,
  Education,
  description,
  currentSalary,
  expectedSalary,
  experience,
} = body;
    const profileImage = req.files?.image?.[0];
const resume = req.files?.resume?.[0];

    
    const existingUser = await Candidate.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }
if (!profileImage || !resume) {
  return res.status(400).json({
    success: false,
    message: "Profile image and resume are required",
  });
}
      const imageData = {
  filename: profileImage.filename,
  url: process.env.BASEURL + profileImage.filename,
};

const resumeData = {
  filename: resume.filename,
  url: process.env.BASEURL + resume.filename,
};

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOtp = otp();
    const expireTime = Date.now() + 10 * 60 * 1000;

    await sendEmail(
      email,
      "Verification OTP",
      "Check this OTP " + newOtp,
      `
      <html>
        <body style="background:grey;color:white;padding:20px">
          <h2>Your OTP is: ${newOtp}</h2>
          <p>This OTP will expire in 10 minutes</p>
        </body>
      </html>
      `
    );

    const newCandidate = new Candidate({
      name,
      email,
      password: hashedPassword,
      phone,

      location: {
        city,
        state,
        country,
      },

      category,
      skills: skills ? skills.split(",") : [],
      Language: Language ? Language.split(",") : [],

      availability,
      age,
      Gender,
      Education,
      description,

      currentSalary,
      expectedSalary,
      experience,

      otp: newOtp,
      otpExpiry: expireTime,
      isVerified: false,
      profileImage: imageData, 
  resume: resumeData  
    });

    await newCandidate.save();

    res.status(201).json({
      success: true,
      message: "Candidate Registered Successfully. OTP sent to email.",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    console.log("BODY:", req.body);
console.log("FILES:", req.files);
  }
};


const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Candidate.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newOtp = otp();
    const expireTime = Date.now() + 10 * 60 * 1000;

    await sendEmail(
      email,
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

    await Candidate.updateOne(
      { email },
      { "$set": { otp: newOtp, otpExpiry: expireTime } }
    );

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp: userOtp } = req.body;

    const user = await Candidate.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (userOtp !== user.otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    await Candidate.updateOne(
      { email },
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
    const { email, password } = req.body;

    
    const user = await Candidate.findOne({ email });
 
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
  role: user.role,   
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let profile = (req, res) => {
    try {
        if (!req.user) {
            return res.status(500).json({ success: false, message: "not found" })
        }
        res.json({success:true,message: "user found", data: req.user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getAllProfiles = async (req, res) => {
  try {
    const users = await Candidate.find({ isVerified: true})
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
module.exports = {
  registerCandidate,
  resendOtp,
  verifyOtp,
  login,
  profile,getAllProfiles
};