import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { candidateContext } from "../App";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaBookmark,
  FaUser,
  FaLanguage,
  FaGraduationCap,
  FaBriefcase
} from "react-icons/fa";

function Profile() {
const { name } = useParams();
const navigate = useNavigate();

const { candidates } = useContext(candidateContext);

const user = candidates.find(
  (c) => c.name.toLowerCase() === name.toLowerCase()
);

  if (!user) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl">
        Candidate Not Found
      </div>
    );
  }

  return (
    <div className="mt-20">

      <div className="bg-linear-to-r from-gray-100 to-blue-100 py-12 px-6 md:px-20 rounded-b-3xl shadow-sm">

        <div className="flex flex-col md:flex-row justify-between items-center">

          <div className="flex items-center gap-6">

            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={user.profileImage?.url || "/default.png"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold text-gray-800">
                {user.name}
              </h1>

              <p className="text-blue-600 font-medium mt-1">
                {user.category}
              </p>

              <div className="flex flex-wrap gap-6 text-gray-600 mt-3 text-sm">

                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  {user.location?.city}, {user.location?.state}
                </span>

                <span className="flex items-center gap-2">
                  <FaMoneyBillWave />
                  ₹{user.currentSalary}
                </span>

                <span className="flex items-center gap-2">
                  <FaClock />
                  {user.experience} Years
                </span>

              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {user.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 text-blue-700 px-4 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 md:mt-0">

            <a
              href={user.resume?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl shadow hover:bg-blue-700 transition"
            >
              Download CV
            </a>

            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-200 transition">
              <FaBookmark className="text-blue-600" />
            </div>

          </div>

        </div>

      </div>

      <div className="px-6 md:px-20 py-12 bg-gray-50">

        <div className="grid md:grid-cols-3 gap-10">

          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm">

            <h2 className="text-2xl font-semibold mb-6">
              About Candidate
            </h2>

            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {user.description || "No description available"}
            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">

            <div className="flex items-start gap-4">
              <FaBriefcase className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Experience:</h4>
                <p className="text-gray-600">{user.experience} Years</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaUser className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Age:</h4>
                <p className="text-gray-600">{user.age}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMoneyBillWave className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Current Salary:</h4>
                <p className="text-gray-600">₹{user.currentSalary}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMoneyBillWave className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Expected Salary:</h4>
                <p className="text-gray-600">₹{user.expectedSalary}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaUser className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Gender:</h4>
                <p className="text-gray-600">{user.Gender}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaLanguage className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Languages:</h4>
                <p className="text-gray-600">
                  {user.Language?.join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaGraduationCap className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800">Education:</h4>
                <p className="text-gray-600">{user.Education}</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;