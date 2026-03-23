import { useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function Register() {
   let navigate=useNavigate()
const [registerLoading, setRegisterLoading] = useState(false);
const [verifyLoading, setVerifyLoading] = useState(false);
const [resendLoading, setResendLoading] = useState(false);
const [role, setRole] = useState("candidate");
const [otp, setOtp] = useState(false);

  const [login, setLogin] = useState(false)

  const [resendOtp, setResendOtp] = useState(false)

const [otpform, setOtpForm] = useState({
email: "",
otp: "",
});

const [formData, setFormdata] = useState({
name: "",
email: "",
password: "",
phone: "",
city: "",
state: "",
country: "",
category: "",
skills: "",
availability: "",
age: "",
Gender: "",
Language: "",
Education: "",
description: "",
currentSalary: "",
expectedSalary: "",
experience: "",
 image: null,    
  resume: null
});

const inputhandler = (e) => {
setFormdata({ ...formData, [e.target.name]: e.target.value });
};

const otpInputHandler = (e) => {
setOtpForm({ ...otpform, [e.target.name]: e.target.value });
};

const submitHandler = async (e) => {
  e.preventDefault();
  setRegisterLoading(true);

  try {
  const data = new FormData();

for (let key in formData) {
  if (formData[key] !== null && formData[key] !== "") {
    data.append(key, formData[key]);
  }
}

    const response = await axios.post(
      "/api/candidate/register",
      data,
      {
    headers: { "Content-Type": "multipart/form-data" }
      }
    );

    if (response.data.success) {
      alert("Registration successful ✅ OTP sent");

      setOtpForm({
        email: formData.email,
        otp: "",
      });

      setOtp(true);
    }

  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  } finally {
    setRegisterLoading(false);
  }
};

const verifyOtp = async (e) => {
  e.preventDefault();
  setVerifyLoading(true);

  try {
    const res = await axios.post(
      "/api/candidate/verifyotp",
      otpform
    );

   if (res.data.success) {
  alert("Email verified successfully ✅");

  setOtp(false);

  setTimeout(() => {
    setLogin(true);   
  }, 800);
} else {
      alert(res.data.message);
    }
  } catch (error) {
    console.log(error);
    alert("OTP verification failed ❌");
  } finally {
    setVerifyLoading(false);
  }
};

//Otp Resend
const [Resendotpform, setResendOtpForm] = useState({
    email: "",
  })
const otpResendHandler = async (e) => {
  e.preventDefault();
  setResendLoading(true);

  try {
    await axios.post(
      "/api/candidate/resendotp",
      Resendotpform
    );

    alert("New OTP sent to your email");

    setResendOtp(false);
    setOtp(true);

    setOtpForm({
      email: Resendotpform.email,
      otp: "",
    });

  } catch (error) {
    console.error(error);
  } finally {
    setResendLoading(false);
  }
};
  const resendotpinputhandler = (e) => {
    setResendOtpForm({ ...Resendotpform, [e.target.name]: e.target.value });
  };
const [loading, setLoading] = useState(false);

  const [loginform, setLoginForm] = useState({
    email: "",
    password: "",
  });

 const loginHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data } = await axios.post(
      "/api/candidate/login",
      loginform
    );

    if (data.success) {

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login successful ✅");

      if (data.role === "candidate") {
     
        navigate("/candidateprofile");
      } else if (data.role === "organization") {
        navigate("/organizationprofile");
      }

    } else {
      alert(data.message);
    }

  } catch (err) {
    console.error(err);
    alert("Login failed ❌");
  } finally {
    setLoading(false);
  }
};

  const logininputhandler = (e) => {
    setLoginForm({ ...loginform, [e.target.name]: e.target.value });
  };
const fileHandler = (e) => {
  const { name, files } = e.target;
  setFormdata((prev) => ({
    ...prev,
    [name]: files[0],
  }));
};
return (

<>

<div className="min-h-screen mt-20 bg-gray-100 flex items-center justify-center p-6">

  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-10">

    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800">
        Create Your Account  
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        Join the platform and start applying for jobs
      </p>
    </div>

    <div className="flex gap-4 mb-8">
      <button
        type="button"
        onClick={() => navigate("/candidateRegister")}
        className={`flex-1 py-3 rounded-lg font-semibold transition ${
          role === "candidate"
            ? "bg-green-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Candidate
      </button>

      <button
        type="button"
        onClick={() => navigate("/employeRegistration")}
        className={`flex-1 py-3 rounded-lg font-semibold transition ${
          role === "employer"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Employer
      </button>
    </div>

    <form onSubmit={submitHandler} className="space-y-8">

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          <input name="name" value={formData.name} onChange={inputhandler}
            placeholder="Full Name"
            className="input"/>

          <input type="email" name="email" value={formData.email} onChange={inputhandler}
            placeholder="Email Address"
            className="input"/>

          <input type="password" name="password" value={formData.password} onChange={inputhandler}
            placeholder="Password"
            className="input"/>

          <input name="phone" value={formData.phone} onChange={inputhandler}
            placeholder="Mobile Number"
            className="input"/>

          <input type="number" name="age" value={formData.age} onChange={inputhandler}
            placeholder="Age"
            className="input"/>

          <select name="Gender" value={formData.Gender} onChange={inputhandler}
            className="input">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
     

        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Location
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <input name="city" value={formData.city} onChange={inputhandler}
            placeholder="City"
            className="input"/>

          <input name="state" value={formData.state} onChange={inputhandler}
            placeholder="State"
            className="input"/>

          <input name="country" value={formData.country} onChange={inputhandler}
            placeholder="Country"
            className="input"/>
        </div>
 <input type="file" name="image" onChange={fileHandler} style={{ border: "1px solid red", padding: "10px" }} />

<input type="file" name="resume" onChange={fileHandler} style={{ border: "1px solid red", padding: "10px" }} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
          Professional Details
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          <input name="category" value={formData.category} onChange={inputhandler}
            placeholder="Job Category"
            className="input"/>

          <input name="skills" value={formData.skills} onChange={inputhandler}
            placeholder="Skills (React, Node, UI)"
            className="input"/>

          <input name="Language" value={formData.Language} onChange={inputhandler}
            placeholder="Languages"
            className="input"/>

          <input name="Education" value={formData.Education} onChange={inputhandler}
            placeholder="Education"
            className="input"/>

          <input type="number" name="experience" value={formData.experience}
            onChange={inputhandler}
            placeholder="Experience (Years)"
            className="input"/>

          <select name="availability" value={formData.availability}
            onChange={inputhandler}
            className="input">
            <option value="">Availability</option>
            <option>Full Time</option>
            <option>Part Time</option>
          </select>

          <input type="number" name="currentSalary"
            value={formData.currentSalary}
            onChange={inputhandler}
            placeholder="Current Salary"
            className="input"/>

          <input type="number" name="expectedSalary"
            value={formData.expectedSalary}
            onChange={inputhandler}
            placeholder="Expected Salary"
            className="input"/>

        </div>

        <textarea name="description"
          value={formData.description}
          onChange={inputhandler}
          placeholder="Profile Description"
          className="input h-24 mt-4"/>
      </div>

     <button
  type="submit"
  disabled={registerLoading}
  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md"
>
  {registerLoading ? "Registering..." : "Register"}
</button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
       <span
  onClick={() => setLogin(true)}
  className="text-green-600 cursor-pointer font-semibold"
>
  Login
</span>
      </p>

    </form>
  </div>
</div>

{/* Otp  */}
<Dialog open={otp} onClose={() => setOtp(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">

    <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">

  <h2 className="text-2xl font-bold text-center text-green-700 mb-2">
    Email Verification
  </h2>

  <p className="text-center text-gray-500 text-sm mb-6">
    Enter the OTP sent to your email
  </p>

  <form onSubmit={verifyOtp} className="space-y-4">

    <input
      type="email"
      name="email"
      value={otpform.email}
      readOnly
      className="input bg-gray-100"
    />

    <input
      type="text"
      name="otp"
      value={otpform.otp}
      onChange={otpInputHandler}
      placeholder="Enter OTP"
      className="input"
    />

    <button
      type="submit"
      disabled={verifyLoading}
      className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
    >
      {verifyLoading ? "Verifying..." : "Verify OTP"}
    </button>

  </form>

  <p className="text-center text-sm text-gray-500 mt-6">
    Didn't receive OTP?{" "}
    <span
      className="text-green-600 cursor-pointer font-semibold"
      onClick={() => {
        setOtp(false);
        setResendOtp(true);
      }}
    >
      Resend OTP
    </span>
  </p>

</DialogPanel>

  </div>
</Dialog>

     {/* Resend Otp  */}
    <Dialog open={resendOtp} onClose={() => setResendOtp(false)} className="relative z-50">

  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">

   <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">

  <h2 className="text-2xl font-bold text-center text-green-700 mb-2">
    Resend OTP
  </h2>

  <p className="text-center text-gray-500 text-sm mb-6">
    Enter your email to receive a new OTP
  </p>

  <form onSubmit={otpResendHandler} className="space-y-4">

    <input
      type="email"
      name="email"
      value={Resendotpform.email}
      onChange={resendotpinputhandler}
      placeholder="Enter your email"
      className="input"
      required
    />

    <button
      type="submit"
      disabled={resendLoading}
      className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
    >
      {resendLoading ? "Sending..." : "Resend OTP"}
    </button>

  </form>

  <p className="text-center text-sm text-gray-500 mt-6">
    Already received OTP?{" "}
    <span
      className="text-green-600 cursor-pointer font-semibold"
      onClick={() => {
        setResendOtp(false);
        setOtp(true);
      }}
    >
      Enter OTP
    </span>
  </p>

</DialogPanel>

  </div>

</Dialog>


  {/* Login  */}
      <Dialog
        open={login}
        onClose={() => setLogin(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          onClick={() => setLogin(false)}
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
       <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">

  <h1 className="text-center text-2xl font-bold text-green-700 mb-2">
    Welcome Back
  </h1>

  <p className="text-center text-gray-500 text-sm mb-6">
    Login to continue
  </p>

  <form onSubmit={loginHandler} className="space-y-4">

    <input
      type="email"
      name="email"
      value={loginform.email}
      onChange={logininputhandler}
      placeholder="Email Address"
      className="input"
      required
    />

    <input
      type="password"
      name="password"
      value={loginform.password}
      onChange={logininputhandler}
      placeholder="Password"
      className="input"
      required
    />

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
    >
      {loading ? "Logging in..." : "Login"}
    </button>

  </form>

  <p className="text-center text-sm text-gray-500 mt-6">
    Don't have an account?{" "}
    <span
      className="text-green-600 cursor-pointer font-semibold"
      onClick={() => setLogin(false)}
    >
      Create account
    </span>
  </p>

</DialogPanel>
        </div>
      </Dialog>
</>

);

}