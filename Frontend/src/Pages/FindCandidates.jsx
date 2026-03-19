import React, { useContext, useState } from "react";
import { candidateContext } from "../App";
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function FindCandidates() {
  const { candidates } = useContext(candidateContext);

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");

  const categories = [...new Set(candidates.map((c) => c.category))];

  const filteredCandidates = candidates.filter(
    (candidate) =>
      (category ? candidate.category === category : true) &&
      candidate?.location.city.toLowerCase().includes(location.toLowerCase()) &&
      (availability ? candidate.availability === availability : true)
  );
  let navigate =useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-20 mt-20">
      <div className="flex flex-col lg:flex-row gap-8">
        
        <div className="lg:w-1/4 bg-white p-6 rounded-2xl shadow-sm h-fit">
          <h3 className="text-lg font-semibold mb-4">Filter Candidates</h3>

          <div className="mb-4">
            <label className="text-sm font-medium">Category</label>
            <select
              className="w-full mt-1 border border-gray-400 rounded-lg px-3 py-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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
            <label className="text-sm font-medium">Availability</label>
            <select
              className="w-full mt-1 border border-gray-400 rounded-lg px-3 py-2 text-sm"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="">All</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Immediate Joiner">Immediate Joiner</option>
            </select>
          </div>

          <button
            onClick={() => {
              setCategory("");
              setLocation("");
              setAvailability("");
            }}
            className="w-full bg-gray-200 py-2 rounded-lg text-sm hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>

        <div className="flex-1">
          {filteredCandidates.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-20">
              🚫 No candidates found
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col md:flex-row justify-between gap-6"
                >
                  <div className="flex gap-5 flex-1">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-100">
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {candidate.name}
                      </h2>

                      <p className="text-blue-600 text-sm font-medium">
                        {candidate.category}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2 mb-3">
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt /> {candidate.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaBriefcase /> {candidate.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMoneyBillWave /> {candidate.salary}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {candidate.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                        {candidate.availability}
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-auto">
                    <button onClick={()=> navigate(`/Profile/${candidate.name}`)}  className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
                      View Profile
                    </button>
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

export default FindCandidates;