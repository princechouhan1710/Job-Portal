import React, { useContext } from "react";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";
import { candidateContext } from "../App";
import { useNavigate } from "react-router-dom";

function Candidates() {
   let {candidates,setCandidate}=useContext(candidateContext)
let navigate=useNavigate();
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Featured Candidates
          </h2>
          <p className="text-gray-600">
            Discover talented professionals ready to join your company
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition duration-300"
              onClick={()=> navigate(`/Profile/${candidate.name}`)}
            >
              <div className="flex items-center gap-4 mb-4">

                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100">
                  <img
         src={`https://randomuser.mehttp://localhost:4000/api/portraits/men/${Math.floor(Math.random()*10)}.jpg`}
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                  />
                  
                  
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {candidate.name}
                  </h3>
                  <p className="text-blue-600 text-sm font-medium">
                    {candidate.category}
                  </p>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                    <FaMapMarkerAlt size={12} /> {candidate.location.city}
                  </p>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <FaBriefcase size={12} /> {candidate.experience} Years
                </span>
                <span className="flex items-center gap-1">
                  <FaMoneyBillWave size={12} /> {candidate.currentSalary}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mb-4">
                <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                  {candidate.availability}
                </span>
              </div>

              <button   className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                View Profile
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Candidates;