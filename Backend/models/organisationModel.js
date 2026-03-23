const mongoose =require( "mongoose");
const bcrypt =require( "bcryptjs");


const organisationSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: String,
    industry: String,
    companySize: String,
    companyLocation: String,
    companyDescription: String,
        companyLogo: {
      filename: String,
      url: String,
    },
    
        role: { type: String, default: "employer" },
    otp: String,
    otpExpiry: String,    
    isVerified: { type: Boolean, default: false },
    
  },
  { timestamps: true }
);

const Organization = mongoose.model("Organization", organisationSchema);



module.exports= Organization;