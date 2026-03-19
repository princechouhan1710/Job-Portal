import axios from "axios";
import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
let navigate = useNavigate();
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const ordercheck = () => {

  if (!token) {
    navigate("/register");
    return;
  }

  if (role === "candidate") {
    navigate("/candidateprofile");
  } 
  else if (role === "employer") {
    navigate("/employeprofile");
  } 
  else {
    navigate("/register");
  }

};
  return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#2f3441] text-white shadow-md mb-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-1">
        <div className="flex justify-between items-center h-20">

          <div onClick={()=>navigate("/")} className="flex items-center space-x-3">
            <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
              S
            </div>
            <h1 className="text-xl font-semibold">Superio</h1>
          </div>

          <ul className="hidden lg:flex gap-2 items-center space-x-8 text-sm font-medium">
            <NavLink to={"/"} className="hover:text-gray-300 cursor-pointer flex items-center gap-1">
              Home 
            </NavLink>
           {role === "candidate" && (
  <NavLink to="/jobs">Find Jobs</NavLink>
)}

{role === "employer" && (
  <NavLink to="/candidates">Candidates</NavLink>
)}
            <NavLink to={"/about"} className="hover:text-gray-300 cursor-pointer flex items-center gap-1">
              About 
            </NavLink>
           
          </ul>

        <div className="hidden lg:flex items-center space-x-4">

 {!token ? (
  <button
    onClick={() => navigate("/candidateRegister")}
    className="border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-black transition"
  >
    Login / Register
  </button>
) : (
  <button
    onClick={ordercheck}
    className="bg-gray-200 text-black px-5 py-2 rounded-lg hover:bg-white transition"
  >
    Profile
  </button>
)}

</div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#3a4050] px-6 pb-6">
          <ul className="space-y-4 text-sm font-medium pt-4">
            <li className="border-b border-gray-500 pb-2">Home</li>
            <li className="border-b border-gray-500 pb-2">Find Jobs</li>
            <li className="border-b border-gray-500 pb-2">Employers</li>
            <li className="border-b border-gray-500 pb-2">Candidates</li>
            <li className="border-b border-gray-500 pb-2">Blog</li>
            <li className="border-b border-gray-500 pb-2">Pages</li>
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <button className="border border-white py-2 rounded-lg hover:bg-white hover:text-black transition">
              Login / Register
            </button>
            <button className="bg-gray-200 text-black py-2 rounded-lg hover:bg-white transition">
              Job Post
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}