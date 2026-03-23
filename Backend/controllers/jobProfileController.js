const Job = require("../models/JobProfileModel.js");

// const createJob = async (req, res) => {
//   try {

//     const organizationId = req.user._id;

//     const existingJob = await Job.findOne({ companyName: organizationId });

//     if (existingJob) {
//       return res.status(400).json({
//         success: false,
//         message: "This organization already created a job"
//       });
//     }

//     const jobData = {
//       ...req.body,
//       companyName: organizationId
//     };

//     const newJob = await Job.create(jobData);

//     res.status(201).json({
//       success: true,
//       message: "Job created successfully",
//       data: newJob
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
const createJob = async (req, res) => {
  try {

    const organizationId = req.user._id;

    const jobData = {
      ...req.body,
      companyName: organizationId
    };

    const newJob = await Job.create(jobData);

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJob
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getJob = async (req, res) => {
  try {

    const organizationId = req.user._id;

  const jobs = await Job.find({ companyName: organizationId })
  .populate("companyName", "companyName companyLocation companyLogo")
  .populate("applyCandidates","name email skills experience");
    res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      data: jobs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getAllJobs = async (req, res) => {
  try {

   const jobs = await Job.find()
  .populate("companyName", "companyName companyLocation companyLogo");
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found"
      });
    }

    res.status(200).json({
      success: true,
      message: "All jobs fetched successfully",
      totalJobs: jobs.length,
      data: jobs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const applyJob = async (req, res) => {
  try {

    const candidateId = req.user.userid;
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    const alreadyApplied = job.applyCandidates?.some(
      (candidate) => candidate.toString() === candidateId
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You already applied"
      });
    }

  job.applyCandidates.push(candidateId);
job.totalApplicants = job.applyCandidates.length;


    await job.save();

    res.status(200).json({
      success: true,
      message: "Applied successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getJobApplicants = async (req, res) => {

  try {

    const { id } = req.params;

    const job = await Job.findById(id)
      .populate("companyName", "companyName companyLocation")
      .populate("applyCandidates", "name email skills experience");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job details fetched",
      totalApplicants: job.applyCandidates.length,
      data: job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


module.exports = { createJob,getJob ,getAllJobs,applyJob,getJobApplicants};