const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },
        companyName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
        },
        
      
        jobDescription: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            
        },
        salary: {
            type: String,
        },
        experience: {
            type: String,
        },
        jobType: {
            type: String,
            enum: ["Full Time", "Part Time", "Internship", "Remote"],
            default: "Full Time",
        },
        skillsRequired: [
            {
                type: String,
            },
        ],
        category: {
            type: String,
        },
        companyLogo: {
            filename: String,
            url: String,
        },
        applicationDeadline: {
            type: Date,
        },
        totalApplicants: {
            type: Number,
            default: 0,
        },

        applyCandidates: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Candidate"
  }
]
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;