import React from "react";
import Jobs from "./Jobs";
import Candidates from "./Candidates";
import { useNavigate } from "react-router-dom";

function Home() {
    let navigate =useNavigate();
    const role = localStorage.getItem("role");
    return (
        <div className="w-full mt-20">

            <section
                className="relative h-screen bg-cover bg-center flex items-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative max-w-7xl mx-auto px-6 w-full text-white">

                    <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
                        Join us & Explore Thousands of Jobs
                    </h1>

                    <p className="mt-6 text-lg text-gray-200 max-w-xl">
                        Find Jobs, Employment & Career Opportunities
                    </p>

                    <div className="mt-10 bg-white rounded-xl shadow-2xl p-6 text-gray-700">
                        <div className="flex flex-col md:flex-row items-center gap-4">

                            <input
                                type="text"
                                placeholder="Job title, keywords, or company"
                                className="w-full md:w-1/3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="text"
                                placeholder="City or postcode"
                                className="w-full md:w-1/4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <select
                                className="w-full md:w-1/4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>All Categories</option>
                                <option>IT & Software</option>
                                <option>Marketing</option>
                                <option>Finance</option>
                            </select>

                            <button onClick={()=>navigate("/jobs")} className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                Find Jobs
                            </button>
                        </div>
                    </div>

                    <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
                        <div>
                            <h2 className="text-3xl font-bold">97,216</h2>
                            <p className="text-gray-300 mt-2">Jobs</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold">4,782</h2>
                            <p className="text-gray-300 mt-2">Members</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold">5,322</h2>
                            <p className="text-gray-300 mt-2">Resume</p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold">6,329</h2>
                            <p className="text-gray-300 mt-2">Company</p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="bg-gray-100 py-20 px-6 md:px-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                    <div className="group bg-gray-400 rounded-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 transition duration-300 hover:shadow-2xl">

                        <div className="text-white max-w-md">
                            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                                Employers
                            </h2>

                            <p className="mb-6 leading-7 text-sm md:text-base">
                                Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt. Labore et dolore nostrud exercitation.
                            </p>

                            <button onClick={()=>navigate("/employeRegistration")} className="bg-white text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
                                Register Account
                            </button>
                        </div>

                        <div className="mt-8 lg:mt-0 flex justify-center w-full lg:w-auto">
                            <img
                                src="https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Femploy.png&w=640&q=75"
                                alt="Employer"
                                className="w-64 md:w-72 lg:w-80 object-contain transition duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>

                    <div className="group bg-[#de7b73] rounded-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 transition duration-300 hover:shadow-2xl">

                        <div className="text-white max-w-md">
                            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                                Candidate
                            </h2>

                            <p className="mb-6 leading-7 text-sm md:text-base">
                                Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt. Labore et dolore nostrud exercitation.
                            </p>

                            <button onClick={()=>navigate("/candidateRegister")} className="bg-white text-red-500 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
                                Register Account
                            </button>
                        </div>

                        <div className="mt-8 lg:mt-0 flex justify-center w-full lg:w-auto">
                            <img
                                src="https://superio-appdir.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcandidate.png&w=640&q=75"
                                alt="Candidate"
                                className="w-64 md:w-72 lg:w-80 object-contain transition duration-300 group-hover:scale-105"
                            />
                        </div>
                    </div>

                </div>
            </section>
            
           {role === "candidate" && <Jobs />}
           {role === "employer" && <Candidates />}  
            <section
                className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/70 to-black/80"></div>

                <div className="relative text-center text-white px-6 max-w-4xl">

                    <h2 className="text-3xl md:text-5xl  font-bold leading-tight">
                        Make Recruiting Your
                        <span className="block text-blue-400">
                            Competitive Advantage
                        </span>
                    </h2>

                    <p className="mt-6 text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                        Superio offers a way to completely optimize your entire recruiting
                        process. Find better candidates, conduct more focused interviews,
                        and make data-driven hiring decisions.
                    </p>

                    <div className="mt-10">
                        <button className="px-12 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-xl hover:bg-blue-700 hover:scale-105 transition duration-300">
                            GET STARTED
                        </button>
                    </div>
                </div>
            </section>
          
        </div>
    );
}

export default Home;