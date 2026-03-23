import React, { useContext } from "react";
import { FaMapMarkerAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";
import { jobsContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  let { jobs } = useContext(jobsContext);
  let navigate = useNavigate();

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Jobs of the Day
          </h1>
          <p className="text-gray-600">
            Know your worth and find the job that qualifies your life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job) => (
            
            <div
              key={job._id}
              onClick={() => {
  navigate(`/job/${job._id}`);
}}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition duration-300"
            >
             
              <div className="flex items-start gap-5">

                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img
         src={`https://randomuser.mehttp://localhost:4000/api/portraits/men/${Math.floor(Math.random()*10)}.jpg`}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">
                    {job.jobTitle}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{job.category}</span>

                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt /> {job?.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <FaClock /> {job.jobType}
                    </span>

                    <span className="flex items-center gap-1">
                      <FaMoneyBillWave /> {job.salary}
                    </span>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    {job.skillsRequired?.map((skill, index) => (
                      <button
                        key={index}
                        className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}