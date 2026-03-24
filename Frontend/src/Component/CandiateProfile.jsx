import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CandiateProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
console.log(token)
console.log(role)
    if (!token) {
      navigate("/candidateRegister");
      return;
    }

    let url = "";
    if (role === "candidate") {
      url = "/api/candidate/profile";
    } else if (role === "employer") {
      url = "/api/organization/profile";
    }
const { data } = await axios.get(url, {
  headers: {
    token: token,
  },
});

    if (data.success) {
      setUserProfile(data.data);
    }

  } catch (error) {
    console.log(error?.response?.data);
    navigate("/candidateRegister");
  }
};

  useEffect(() => {
    getUser();
  }, []);

  if (!userProfile) {
    return <p className="text-center mt-32">Loading Profile...</p>;
  }
const logoutHandler = () => {
  localStorage.clear();
  navigate("/candidateRegister");
};
  return (
 
<div className="bg-gray-100 min-h-screen pt-24 pb-10 px-6">

<div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">


<div className="bg-white shadow-lg rounded-xl p-6 h-fit">

<div className="flex flex-col items-center text-center">

<img
  src={userProfile?.profileImage?.url}
  alt="profile"
  className="w-28 h-28 rounded-full border"
/>

<h1 className="text-xl font-bold mt-4">
{userProfile?.name}
</h1>

<p className="text-gray-600 text-sm">
{userProfile?.category}
</p>

<p className="text-gray-500 text-sm mt-1">
{userProfile?.location?.city}, {userProfile?.location?.state}
</p>

</div>

<div className="mt-6 space-y-2 text-sm text-gray-600">

<p>📧 {userProfile?.email}</p>
<p>📞 {userProfile?.phone}</p>

</div>

<div className="flex flex-col gap-3 mt-6">

<button
onClick={()=>navigate("/edit-profile")}
className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
>
Edit Profile
</button>

<button
onClick={logoutHandler}
className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
>
Logout
</button>

</div>

</div>


<div className="md:col-span-2 space-y-6">


<div className="bg-white shadow-lg rounded-xl p-6">

<h2 className="text-xl font-semibold mb-3">
About Me
</h2>

<p className="text-gray-600">
{userProfile?.description || "No description added"}
</p>

</div>


<div className="bg-white shadow-lg rounded-xl p-6">

<h2 className="text-xl font-semibold mb-4">
Skills
</h2>

<div className="flex flex-wrap gap-2">

{userProfile?.skills?.length ? (

userProfile?.skills.map((skill,i)=>(
<span
key={i}
className="bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full"
>
{skill}
</span>
))

) : (

<p className="text-gray-500">No skills added</p>

)}

</div>

</div>


<div className="grid md:grid-cols-2 gap-6">

<div className="bg-white shadow-lg rounded-xl p-6">

<h2 className="text-lg font-semibold mb-3">
Experience
</h2>

<p className="text-gray-600">
{userProfile?.experience || 0} Years
</p>

<p className="text-gray-600 mt-2">
Availability: {userProfile?.availability || "Not specified"}
</p>

</div>

<div className="bg-white shadow-lg rounded-xl p-6">

<h2 className="text-lg font-semibold mb-3">
Salary
</h2>

<p className="text-gray-600">
Current Salary: ₹{userProfile?.currentSalary || 0} LPA
</p>

<p className="text-gray-600 mt-2">
Expected Salary: ₹{userProfile?.expectedSalary || 0} LPA
</p>

</div>

</div>


<div className="bg-white shadow-lg rounded-xl p-6">

<h2 className="text-xl font-semibold mb-3">
Education
</h2>

<p className="text-gray-600">
{userProfile?.Education || "Not added"}
</p>

</div>


<div className="bg-white shadow-lg rounded-xl p-6">

<h2 className="text-xl font-semibold mb-4">
Languages
</h2>

<div className="flex flex-wrap gap-2">

{userProfile?.Language?.length ? (

userProfile?.Language.map((lang,i)=>(
<span
key={i}
className="bg-green-100 text-green-600 px-3 py-1 text-sm rounded-full"
>
{lang}
</span>
))

) : (

<p className="text-gray-500">No languages added</p>

)}

</div>

</div>


<div className="bg-white shadow-lg rounded-xl p-6">

<h2 className="text-xl font-semibold mb-4">
Resume
</h2>

{userProfile?.resume?.url ? (

<a
href={userProfile?.resume.url}
target="_blank"
className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
>
Download Resume
</a>

) : (

<p className="text-gray-500">
No resume uploaded
</p>

)}

</div>

</div>

</div>

</div>

  );
}

export default CandiateProfile;