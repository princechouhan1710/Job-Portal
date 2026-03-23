import { useState } from "react";
import axios from "axios";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function Employeregistration() {
   let navigate=useNavigate()
const [registerLoading, setRegisterLoading] = useState(false);
const [verifyLoading, setVerifyLoading] = useState(false);
const [resendLoading, setResendLoading] = useState(false);
const [role, setRole] = useState("employer");
const [otp, setOtp] = useState(false);

  const [login, setLogin] = useState(false)

  const [resendOtp, setResendOtp] = useState(false)

const [otpform, setOtpForm] = useState({
companyEmail: "",
otp: "",
});
const [formData, setFormdata] = useState({
companyName: "",
companyEmail: "",
password: "",
phoneNumber: "",
industry: "",
companySize: "",
companyLocation: "",
companyDescription: ""
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
    const response = await axios.post(
      "http://localhost:4000/api/organization/register",
      formData
    );

    if (response.data.success) {
      alert("Registration successful ✅ OTP sent");

      setOtpForm({
  companyEmail: formData.companyEmail,
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
      "http://localhost:4000/api/organization/verifyotp",
      otpform
    );

    if (res.data.success) {
      alert("Email verified successfully ✅ Redirecting to login...");

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
    companyEmail: "",
  })
const otpResendHandler = async (e) => {
  e.preventDefault();
  setResendLoading(true);

  try {
    await axios.post(
      "http://localhost:4000/api/organization/resendotp",
      Resendotpform
    );

    alert("New OTP sent to your email");

    setResendOtp(false);
    setOtp(true);

    setOtpForm({
    companyEmail: Resendotpform.companyEmail,
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
    companyEmail: "",
    password: "",
  });

const loginHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      "http://localhost:4000/api/organization/login",
      loginform
    );
    console.log(res)
    if (res.data.success) {

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("role", res.data.user.role);

      alert("Login successful ✅");
   if (res.data.user.role === "employer") {
  navigate("/employeprofile");
} else {
  navigate("/candidateprofile");
}

    }

  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message);
  } finally {
    setLoading(false);
  }
};
  const logininputhandler = (e) => {
    setLoginForm({ ...loginform, [e.target.name]: e.target.value });
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
Company Information
</h3>

<div className="grid md:grid-cols-2 gap-4">

<input
name="companyName"
value={formData.companyName}
onChange={inputhandler}
placeholder="Company Name"
className="input"
/>

<input
type="email"
name="companyEmail"
value={formData.companyEmail}
onChange={inputhandler}
placeholder="Company Email"
className="input"
/>

<input
type="password"
name="password"
value={formData.password}
onChange={inputhandler}
placeholder="Password"
className="input"
/>

<input
name="phoneNumber"
value={formData.phoneNumber}
onChange={inputhandler}
placeholder="Company Phone"
className="input"
/>

</div>
</div>

<div>
<h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
Company Details
</h3>

<div className="grid md:grid-cols-2 gap-4">

<input
name="industry"
value={formData.industry}
onChange={inputhandler}
placeholder="Industry (IT, Finance, Healthcare)"
className="input"
/>

<select
name="companySize"
value={formData.companySize}
onChange={inputhandler}
className="input"
>
<option value="">Company Size</option>
<option>1-10 Employees</option>
<option>11-50 Employees</option>
<option>51-200 Employees</option>
<option>201-500 Employees</option>
<option>500+ Employees</option>
</select>

<input
name="companyLocation"
value={formData.companyLocation}
onChange={inputhandler}
placeholder="Company Location"
className="input"
/>

</div>

<textarea
name="companyDescription"
value={formData.companyDescription}
onChange={inputhandler}
placeholder="Company Description"
className="input h-28 mt-4"
/>

</div>

<button
type="submit"
disabled={registerLoading}
className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
>
{registerLoading ? "Registering..." : "Register Company"}
</button>

<p className="text-center text-sm text-gray-500">
Already have an account?{" "}
<span
onClick={() => setLogin(true)}
className="text-blue-600 cursor-pointer font-semibold"
>
Login
</span>
</p>

</form>
  </div>
</div>


<Dialog open={otp} onClose={() => setOtp(false)} className="relative z-50">
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">

    <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">

  <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
    Email Verification
  </h2>

  <p className="text-center text-gray-500 text-sm mb-6">
    Enter the OTP sent to your email
  </p>

  <form onSubmit={verifyOtp} className="space-y-4">

    <input
      type="email"
      name="companyEmail"
      value={otpform.companyEmail}
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
      className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      {verifyLoading ? "Verifying..." : "Verify OTP"}
    </button>

  </form>

  <p className="text-center text-sm text-gray-500 mt-6">
    Didn't receive OTP?{" "}
    <span
      className="text-blue-600 cursor-pointer font-semibold"
     onClick={() => {
  setOtp(false);
  setResendOtp(true);

 setResendOtpForm({
  companyEmail: otpform.companyEmail
});
}}
    >
      Resend OTP
    </span>
  </p>

</DialogPanel>

  </div>
</Dialog>

    <Dialog open={resendOtp} onClose={() => setResendOtp(false)} className="relative z-50">

  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">

   <DialogPanel className="w-full max-w-md bg-white rounded-2xl p-8 shadow-xl">

  <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
    Resend OTP
  </h2>

  <p className="text-center text-gray-500 text-sm mb-6">
    Enter your email to receive a new OTP
  </p>

  <form onSubmit={otpResendHandler} className="space-y-4">

    <input
      type="email"
      name="companyEmail"
      value={Resendotpform.companyEmail}
      onChange={resendotpinputhandler}
      placeholder="Enter your email"
      className="input"
      required
    />

    <button
      type="submit"
      disabled={resendLoading}
      className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      {resendLoading ? "Sending..." : "Resend OTP"}
    </button>

  </form>

  <p className="text-center text-sm text-gray-500 mt-6">
    Already received OTP?{" "}
    <span
      className="text-blue-600 cursor-pointer font-semibold"
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

  <h1 className="text-center text-2xl font-bold text-blue-700 mb-2">
    Welcome Back
  </h1>

  <p className="text-center text-gray-500 text-sm mb-6">
    Login to continue
  </p>

  <form onSubmit={loginHandler} className="space-y-4">

    <input
      type="email"
      name="companyEmail"
      value={loginform.companyEmail}
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
      className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      {loading ? "Logging in..." : "Login"}
    </button>

  </form>

  <p className="text-center text-sm text-gray-500 mt-6">
    Don't have an account?{" "}
    <span
      className="text-blue-600 cursor-pointer font-semibold"
      onClick={() => {
        setLogin(false);
      }}
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