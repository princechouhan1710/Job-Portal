import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ViewApplyJobCandidateDetail() {
const navigate =useNavigate();
const { id } = useParams();
const [job,setJob] = useState(null);

const getJobDetails = async () => {

try{

const token = localStorage.getItem("token");

const { data } = await axios.get(
`http://localhost:4000/api/job/job/${id}`,
{
headers:{
token: token
}
}
);

if(data.success){
setJob(data.data);
}

}catch(error){
console.log(error);
}

};

useEffect(()=>{
getJobDetails();
},[]);

if(!job){
return (
<div className="flex justify-center items-center h-screen">
<p className="text-lg text-gray-500">Loading Job Details...</p>
</div>
);
}

return (

<div className="bg-gray-100 min-h-screen pt-24 pb-12 px-6">

<div className="max-w-7xl mx-auto space-y-8">

<div className="bg-white rounded-2xl shadow-lg p-8">

<h1 className="text-3xl font-bold text-gray-800">
{job.jobTitle}
</h1>

<div className="flex flex-wrap gap-6 mt-4 text-gray-600">

<p>📍 {job.location}</p>
<p>💰 {job.salary}</p>
<p>🧑‍💻 {job.experience} Years</p>

</div>

<p className="mt-6 text-gray-700 leading-relaxed">
{job.jobDescription}
</p>

<div className="flex flex-wrap gap-2 mt-5">

{job.skillsRequired?.map((skill,i)=>(
<span
key={i}
className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm"
>
{skill}
</span>
))}

</div>

</div>


<div className="flex justify-between items-center">

<h2 className="text-2xl font-semibold text-gray-800">
Applicants
</h2>

<span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
{job.applyCandidates.length} Candidates
</span>

</div>


{job.applyCandidates.length === 0 ? (

<div className="bg-white p-10 rounded-xl shadow text-center">
<p className="text-gray-500">
No candidates have applied yet.
</p>
</div>

) : (

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

{job.applyCandidates.map((candidate)=>(

<div
key={candidate._id}
className="bg-white  rounded-xl p-6 shadow-sm hover:shadow-lg transition"
>


<div className="flex items-center gap-4">

<img
src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
alt="candidate"
className="w-12 h-12 rounded-full"
/>

<div>

<h3 className="text-lg font-semibold text-gray-800">
{candidate.name || "Candidate"}
</h3>

<p className="text-sm text-gray-500">
{candidate.email || "No email"}
</p>

</div>

</div>


<div className="mt-4 space-y-2 text-sm">

<p>
<strong>Experience:</strong> {candidate.experience || 0} Years
</p>

</div>


<div className="mt-4">

<p className="text-sm font-medium text-gray-700">
Skills
</p>

<div className="flex flex-wrap gap-2 mt-2">

{candidate.skills?.length ? (

candidate.skills.map((skill,i)=>(
<span
key={i}
className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded"
>
{skill}
</span>
))

) : (

<span className="text-gray-400 text-xs">
No skills added
</span>

)}

</div>

</div>


<div className="flex gap-3 mt-5">

<button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700" 
onClick={()=> navigate(`/Profile/${candidate.name}`)}>
View Profile
</button>

<button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
Shortlist
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

export default ViewApplyJobCandidateDetail;