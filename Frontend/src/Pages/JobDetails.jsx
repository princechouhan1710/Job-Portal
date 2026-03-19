import { useParams } from "react-router-dom";
import { useContext } from "react";
import { jobsContext } from "../App";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaBriefcase,
} from "react-icons/fa";
import axios from "axios";

function JobDetails() {
 const { id } = useParams();
const { jobs } = useContext(jobsContext);

if (!jobs || jobs.length === 0) {
  return <div className="p-20 text-center">Loading...</div>;
}


  const job = jobs?.find((j) => j?._id?.toString() === id);
const applyJob = async () => {

  const token = localStorage.getItem("token");
 const role = localStorage.getItem("role");

if(role !== "candidate"){
  alert("Only candidates can apply");
  return;
}

  if (!token) {
    alert("Please login as candidate");
    return;
  }

  try {

    const res = await axios.post(
      `/api/job/apply/${job._id}`,
      {},
      {
      headers: {
          token: token   
        },
      }
    );

    alert(res.data.message);

  } catch (err) {
console.log(err.response);
alert(err.response?.data?.message || err.message);
  }
};
  if (!job) {
    return (
      <div className="p-20 text-center text-gray-500 text-lg">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-6 md:px-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        <div className="md:col-span-2 flex flex-col gap-8">

          <div className="bg-white rounded-2xl shadow-sm p-8">

            <div className="flex items-start gap-6">

              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={job.companyLogo?.url || "https://picsum.photos/200"}
                  alt="company"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {job.jobTitle}
                </h1>

                <p className="text-gray-500 mt-1">
                  {job.companyName?.companyName}
                </p>
       

                <div className="flex flex-wrap gap-5 text-sm text-gray-500 mt-4">

                  <span className="flex items-center gap-2">
                    <FaMapMarkerAlt /> {job.location}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaClock /> {job.jobType}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaMoneyBillWave /> {job.salary} LPA
                  </span>

                  <span className="flex items-center gap-2">
                    <FaBriefcase /> {job.experience} Years
                  </span>

                </div>
              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">

            <h2 className="text-xl font-semibold mb-4">
              Job Description
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {job.jobDescription}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">

            <h2 className="text-xl font-semibold mb-5">
              Required Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {job.skillsRequired?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}

            </div>

          </div>

        </div>

        <div className="flex flex-col gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">

       <button
onClick={applyJob}
disabled={job.applyCandidates?.some(
  (c) => c._id === localStorage.getItem("userId")
)}
className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:bg-gray-400"
>
{job.applyCandidates?.some(
  (c) => c._id === localStorage.getItem("userId")
)
  ? "Already Applied"
  : "Apply For Job"}
</button>

            <div className="mt-6 flex flex-col gap-4 text-sm text-gray-600">

              <div className="flex justify-between">
                <span>Location</span>
                <span className="font-medium">{job.location}</span>
              </div>

              <div className="flex justify-between">
                <span>Job Type</span>
                <span className="font-medium">{job.jobType}</span>
              </div>

              <div className="flex justify-between">
                <span>Salary</span>
                <span className="font-medium">{job.salary}</span>
              </div>

              <div className="flex justify-between">
                <span>Experience</span>
                <span className="font-medium">{job.experience}</span>
              </div>

            </div>

          </div>

        </div>

      </div>
      

    </div>
  );
}

export default JobDetails;