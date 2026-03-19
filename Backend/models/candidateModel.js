const mongoose =require( "mongoose");

const candidateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, required: true },
    location: {
      city: String,
      state: String,
      country: String,
    },
      otp: String,
    otpExpiry: String,
    isVerified: { type: Boolean, default: false },
    category: { type: String, required: true },
    skills: [String],
    availability:  String ,
     age:  Number ,
     Gender:  String ,
     Language: [],
     Education:  String ,
     description:  String ,
      profileImage: {
       filename: String,
       url: String,
     },
     resume: {
       filename: String,
       url: String,
     },
   currentSalary: { type: Number, default: 0  },   
     expectedSalary: { type: Number },
    experience: { type: Number, default: 0 },
        role: { type: String, default: "candidate" },
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports= Candidate;