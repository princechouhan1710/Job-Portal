import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployerProfile() {

  const [company, setCompany] = useState(null);
  const [getJob, setGetJobs] = useState([]);
  const navigate = useNavigate();

  const getCompany = async () => {
    try {

      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || role !== "employer") {
        navigate("/candidateRegister");
        return;
      }

      const { data } = await axios.get(
        "/api/organization/profile",
        {
          headers: {
            token: token,
          },
        }
      );

      if (data.success) {
        setCompany(data.data);
      }

    } catch (error) {
      console.log(error?.response?.data);
      navigate("/candidateRegister");
    }
  };

  useEffect(() => {
    getCompany();
     getJobs();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/employeRegistration");
  };
const [jobData, setJobData] = useState({
  jobTitle: "",
  jobDescription: "",
  location: "",
  salary: "",
  experience: "",
  jobType: "Full Time",
  skillsRequired: "",
  category: "",
  applicationDeadline: ""
});

const inputHandler = (e) => {
  setJobData({ ...jobData, [e.target.name]: e.target.value });
};

const postJobHandler = async (e) => {
  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    const payload = {
      ...jobData,
      skillsRequired: jobData.skillsRequired.split(",")
    };

    const { data } = await axios.post(
      "/api/job/createJOb",
      payload,
      {
        headers: {
          token: token
        }
      }
    );

    if (data.success) {

      alert("Job Posted Successfully ✅");

      setJobData({
        jobTitle: "",
        jobDescription: "",
        location: "",
        salary: "",
        experience: "",
        jobType: "Full Time",
        skillsRequired: "",
        category: "",
        applicationDeadline: ""
      });

      getJobs();

    }

  } catch (error) {
    console.log(error);
    alert("Job Post Failed");
  }
};
const getJobs = async () => {

  try {

    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      "/api/job/getJob",
      {
        headers:{
          token: token
        }
      }
    );

    if(data.success){
      setGetJobs(data.data);
    }

  } catch (error) {
    console.log(error);
  }

};



  if (!company) {
    return <p className="text-center mt-32">Loading Company Profile...</p>;
  }

  
 return (
<div className="bg-gray-100 min-h-screen pt-24 pb-12 px-6">

<div className="max-w-7xl mx-auto space-y-8">

<div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row justify-between items-center">

<div className="flex items-center gap-6">

<img
src={company?.companyLogo?.url}
alt="company"
className="w-24 h-24 rounded-full border"
/>

<div>
<h1 className="text-3xl font-bold text-gray-800">
{company.companyName}
</h1>

<p className="text-blue-600 font-medium">
{company.industry}
</p>

<p className="text-gray-500 text-sm mt-1">
 {company.companyLocation}
</p>

<p className="text-gray-500 text-sm">
 {company.companyEmail}
</p>

<p className="text-gray-500 text-sm">
 {company.phoneNumber}
</p>
</div>

</div>

<div className="flex gap-4 mt-6 md:mt-0">

<button
onClick={() => navigate("/edit-company-profile")}
className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
>
Edit Profile
</button>

<button
onClick={logoutHandler}
className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
>
Logout
</button>

</div>

</div>

<div className="bg-white rounded-2xl shadow-lg p-8">
<h2 className="text-xl font-semibold mb-3 text-gray-800">
About Company
</h2>

<p className="text-gray-600 leading-relaxed">
{company.companyDescription || "No company description available"}
</p>
</div>

<div className="grid md:grid-cols-2 gap-6">

<div className="bg-white rounded-2xl shadow-lg p-6">
<h2 className="text-lg font-semibold mb-4">
Company Information
</h2>

<p className="text-gray-600">
Industry: {company.industry}
</p>

<p className="text-gray-600 mt-2">
Company Size: {company.companySize}
</p>

</div>

<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-lg font-semibold mb-4">
Contact Information
</h2>

<p className="text-gray-600">
Email: {company.companyEmail}
</p>

<p className="text-gray-600 mt-2">
Phone: {company.phoneNumber}
</p>

<p className="text-gray-600 mt-2">
Location: {company.companyLocation}
</p>

</div>

</div>

<div className="bg-white rounded-2xl shadow-lg p-8">

<h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
Post New Job
</h2>

<form
onSubmit={postJobHandler}
className="grid md:grid-cols-2 gap-6"
>

<div className="md:col-span-2">
<label className="block text-gray-700 font-medium mb-2">
Job Title
</label>

<input
type="text"
name="jobTitle"
value={jobData.jobTitle}
onChange={inputHandler}
placeholder="MERN Stack Developer"
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
/>
</div>

<div>
<label className="block text-gray-700 font-medium mb-2">
Location
</label>

<input
type="text"
name="location"
value={jobData.location}
onChange={inputHandler}
placeholder="City or Remote"
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
/>
</div>

<div>
<label className="block text-gray-700 font-medium mb-2">
Job Type
</label>

<select
name="jobType"
value={jobData.jobType}
onChange={inputHandler}
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
>
<option>Full Time</option>
<option>Part Time</option>
<option>Internship</option>
<option>Remote</option>
</select>
</div>

<div>
<label className="block text-gray-700 font-medium mb-2">
Salary
</label>

<input
type="text"
name="salary"
value={jobData.salary}
onChange={inputHandler}
placeholder="₹6 - ₹10 LPA"
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
/>
</div>

<div>
<label className="block text-gray-700 font-medium mb-2">
Experience
</label>

<input
type="text"
name="experience"
value={jobData.experience}
onChange={inputHandler}
placeholder="2 - 4 Years"
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
/>
</div>

<div className="md:col-span-2">
<label className="block text-gray-700 font-medium mb-2">
Category
</label>

<input
type="text"
name="category"
value={jobData.category}
onChange={inputHandler}
placeholder="Software Development / Design"
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
/>
</div>

<div className="md:col-span-2">
<label className="block text-gray-700 font-medium mb-2">
Skills Required
</label>

<input
type="text"
name="skillsRequired"
value={jobData.skillsRequired}
onChange={inputHandler}
placeholder="React, Node.js, MongoDB"
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
/>

<p className="text-sm text-gray-500 mt-1">
Separate skills with commas
</p>
</div>

<div className="md:col-span-2">
<label className="block text-gray-700 font-medium mb-2">
Application Deadline
</label>

<input
type="date"
name="applicationDeadline"
value={jobData.applicationDeadline}
onChange={inputHandler}
className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
/>
</div>

<div className="md:col-span-2">
<label className="block text-gray-700 font-medium mb-2">
Job Description
</label>

<textarea
name="jobDescription"
value={jobData.jobDescription}
onChange={inputHandler}
placeholder="Describe responsibilities, requirements..."
className="w-full border rounded-lg p-3 h-36 focus:ring-2 focus:ring-blue-500"
/>
</div>

<div className="md:col-span-2">

<button
type="submit"
className="bg-blue-600 text-white px-10 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
>
Post Job
</button>

</div>

</form>

</div>

</div>


<div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

<h2 className="text-2xl font-semibold mb-6">
Posted Jobs
</h2>

{getJob.length === 0 ? (
  <p className="text-gray-500">No jobs posted yet</p>
) : (

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{getJob.map((job)=>(
  
<div
key={job._id}
className="border rounded-xl p-6 hover:shadow-xl transition bg-gray-50"
>

<h3 className="text-xl font-semibold text-gray-800">
{job.jobTitle}
</h3>

<p className="text-blue-600 text-sm">
{job.category}
</p>

<div className="mt-3 space-y-1 text-sm text-gray-600">

<p>📍 {job.location}</p>
<p>💰 {job.salary}</p>
<p>🧑‍💻 {job.experience} Years</p>

</div>

<div className="flex flex-wrap gap-2 mt-3">

{job.skillsRequired?.map((skill,i)=>(
<span
key={i}
className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded"
>
{skill}
</span>
))}

</div>

<div className="mt-5 flex justify-between items-center">

<p className="text-sm text-gray-600">
👥 {job.totalApplicants} Applicants
</p>

<button
onClick={()=>navigate(`/viewJobDetail/${job._id}`)}
className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
>
View Applicants
</button>

</div>

</div>

))}

</div>

)}

</div>

</div>
);
}

export default EmployerProfile;