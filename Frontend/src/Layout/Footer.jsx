import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

export default function Footer() {
    return (
        <footer className="bg-[#2f3441] text-gray-300 pt-14 pb-6 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-semibold text-white mb-6">Superio</h2>

                        <p className="font-semibold text-white">Call us</p>
                        <p className="text-lg font-bold mt-1 mb-4">123 456 7890</p>

                        <p className="text-sm leading-6">
                            329 Queensberry Street, North Melbourne VIC 3051, Australia.
                        </p>

                        <p className="mt-4 text-sm">support@superio.com</p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6">For Candidates</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="hover:text-white cursor-pointer">Browse Jobs</li>
                            <li className="hover:text-white cursor-pointer">Browse Categories</li>
                            <li className="hover:text-white cursor-pointer">Candidate Dashboard</li>
                            <li className="hover:text-white cursor-pointer">Job Alerts</li>
                            <li className="hover:text-white cursor-pointer">My Bookmarks</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6">For Employers</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="hover:text-white cursor-pointer">Browse Candidates</li>
                            <li className="hover:text-white cursor-pointer">Employer Dashboard</li>
                            <li className="hover:text-white cursor-pointer">Add Job</li>
                            <li className="hover:text-white cursor-pointer">Job Packages</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6">About Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="hover:text-white cursor-pointer">Job Page</li>
                            <li className="hover:text-white cursor-pointer">Resume Page</li>
                            <li className="hover:text-white cursor-pointer">Blog</li>
                            <li className="hover:text-white cursor-pointer">Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-6">Join Us On</h3>
                        <p className="text-sm mb-4">We don’t send spam so don’t worry.</p>

                        <div className="flex bg-white rounded-lg overflow-hidden">
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex-1 px-4 py-2 text-black outline-none"
                            />
                            <button className="bg-blue-600 px-4 flex items-center justify-center text-white">
                                <IoMailOutline size={20} />
                            </button>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-600 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-sm text-center md:text-left">
                        © 2026 Superio. All Rights Reserved.
                    </p>

                    <div className="flex space-x-4 text-lg">
                        <FaFacebookF className="hover:text-white cursor-pointer" />
                        <FaTwitter className="hover:text-white cursor-pointer" />
                        <FaInstagram className="hover:text-white cursor-pointer" />
                        <FaLinkedinIn className="hover:text-white cursor-pointer" />
                    </div>

                </div>

            </div>
        </footer>
    );
}