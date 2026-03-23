import React, { useContext, useState } from "react";
import { jobsContext } from "../App";
import { FaMapMarkerAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function FindJobs() {
  const { jobs } = useContext(jobsContext);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const filteredJobs = jobs.filter((job) =>
    job.jobTitle?.toLowerCase().includes(search.toLowerCase()) &&
    job.location?.toLowerCase().includes(location.toLowerCase()) &&
    (type ? job.jobType === type : true)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20 mt-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Find Your Dream Job </h2>
        <p className="text-gray-500 mt-2"> Explore the latest opportunities and apply today </p> </div>
      <div className="flex flex-col lg:flex-row gap-8">

        <div className="lg:w-1/4 bg-white p-6 rounded-2xl shadow-sm  h-fit">
          <h3 className="text-lg font-semibold mb-4">Filter Jobs</h3>

          <div className="mb-4">
            <label className="text-sm font-medium">Job Title</label>
            <input
              type="text"
              placeholder="Search by title"
              className="w-full mt-1 border border-gray-400 rounded-lg px-3 py-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Location</label>
            <input
              type="text"
              placeholder="Search by city"
              className="w-full mt-1 border border-gray-400 rounded-lg px-3 py-2 text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Job Type</label>
            <select
              className="w-full mt-1 border border-gray-400 rounded-lg px-3 py-2 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">All</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearch("");
              setLocation("");
              setType("");
            }}
            className="w-full bg-gray-200 py-2 rounded-lg text-sm hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>

        <div className="flex-1">
          {filteredJobs.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-20">
              🚫 No jobs found
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition flex flex-col lg:flex-row justify-between gap-6 border"
                   onClick={() => {
  navigate(`/job/${job._id}`);
}} >
                  <div className="flex gap-5 flex-1">

                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img
  src={job?.companyName?.companyLogo?.url}
  alt="Company Logo"
  className="w-full h-full object-cover"
/>
                    </div>

                    <div className="flex-1">

                      <h2 className="text-xl font-semibold text-gray-800">
                        {job.jobTitle}
                      </h2>

                      <p className="text-sm text-gray-500 mb-3">
                        {job.companyName?.name || "Company"}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">

                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt /> {job.location || "Remote"}
                        </span>

                        <span className="flex items-center gap-1">
                          <FaClock /> {job.jobType}
                        </span>

                        <span className="flex items-center gap-1">
                          <FaMoneyBillWave /> {job.salary || "Not disclosed"}
                        </span>

                        {job.experience && (
                          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                            {job.experience} Exp
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {job.skillsRequired?.slice(0, 5).map((skill, index) => (
                          <span
                            key={index}
                            className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-gray-400 mt-3">
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end gap-4">

                    {job.applicationDeadline && (
                      <p className="text-xs text-red-500">
                        Apply before: {new Date(job.applicationDeadline).toLocaleDateString()}
                      </p>
                    )}

                  {role == "candidate" &&   <button
                      onClick={() => navigate(`/job/${job._id}`)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                      Apply Now
                    </button>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default FindJobs;    