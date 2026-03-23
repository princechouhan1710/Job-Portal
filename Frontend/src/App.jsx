import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Layout/Navbar'
import Home from './Pages/Home'
import FindJobs from './Pages/FindJobs.jsx'
import About from './Pages/About.jsx'
import FindCandidates from './Pages/FindCandidates.jsx'
import Register from './Component/Register.jsx'
import JobDetails from './Pages/JobDetails.jsx'
import Footer from './Layout/Footer'
import { Route, Routes } from 'react-router-dom';
import  Profile  from './Pages/Profile.jsx'
import axios from 'axios'
import Employeregistration from './Component/Employeregistration.jsx'
import CandiateProfile from './Component/CandiateProfile.jsx'
import EmployerProfile from './Component/EmployerProfile.jsx'
import ViewApplyJobCandidateDetail from './Component/ViewApplyJobCandidateDetail.jsx'
export const jobsContext =createContext();
export const candidateContext =createContext();
function App() {
//   let [jobs,setJobs]=useState([
//   {
//     id: 1,
//     title: "Senior UI/UX Designer",
//     company: "Tech Solutions",
//     category: "Design",
//     city: "Indore",
//     time: "Full Time",
//     salary: "₹40k - ₹60k",
//     logo: "https://picsum.photos/200/300?random=12",
//     tags: ["Private", "Urgent"],
//     description: `As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent. You will help the team design beautiful interfaces that solve business challenges for our clients.`,
//     Key_responsibilities: [
//       "Lead the complete product design cycle from research to final delivery.",
//       "Create wireframes, prototypes, and high-fidelity UI designs.",
//       "Collaborate with product managers and developers.",
//       "Conduct usability testing and improve user experience.",
//       "Maintain and improve the company design system."
//     ],
//     Skill: [
//       "3+ years of experience in UI/UX or Product Design.",
//       "Proficiency in Figma, Sketch, or Adobe XD.",
//       "Strong understanding of user-centered design principles.",
//       "Experience working in Agile/Scrum teams.",
//       "Good communication and problem-solving skills."
//     ]
//   },
//   {
//     id: 2,
//     title: "Frontend Developer",
//     company: "WebWorks",
//     category: "Development",
//     city: "Mumbai",
//     time: "Full Time",
//     salary: "₹35k - ₹55k",
//     logo: "https://picsum.photos/200/300?random=13",
//     tags: ["Remote", "Urgent"],
//     description: `Join our frontend team to build responsive and scalable web applications using React and modern frontend technologies.`,
//     Key_responsibilities: [
//       "Develop responsive web applications using React.",
//       "Write clean and maintainable code.",
//       "Collaborate with UI/UX designers for implementation.",
//       "Optimize web apps for speed and performance.",
//       "Participate in code reviews and agile ceremonies."
//     ],
//     Skill: [
//       "Strong knowledge of JavaScript, React, and CSS.",
//       "Experience with REST APIs and JSON.",
//       "Familiarity with version control (Git).",
//       "Understanding of responsive design principles.",
//       "Good problem-solving and teamwork skills."
//     ]
//   },
//   {
//     id: 3,
//     title: "Backend Developer",
//     company: "TechnoCore",
//     category: "Development",
//     city: "Bengaluru",
//     time: "Full Time",
//     salary: "₹50k - ₹70k",
//     logo: "https://picsum.photos/200/300?random=14",
//     tags: ["Private"],
//     description: `Work on building scalable backend systems, APIs, and services for our SaaS products.`,
//     Key_responsibilities: [
//       "Design and implement RESTful APIs.",
//       "Maintain and optimize database systems.",
//       "Ensure security and data protection standards.",
//       "Collaborate with frontend developers for integrations.",
//       "Monitor system performance and reliability."
//     ],
//     Skill: [
//       "Strong experience in Node.js or Python.",
//       "Knowledge of SQL and NoSQL databases.",
//       "Understanding of API design and microservices.",
//       "Familiarity with cloud platforms (AWS, Azure).",
//       "Strong debugging and analytical skills."
//     ]
//   },
//   {
//     id: 4,
//     title: "Digital Marketing Manager",
//     company: "MarketHive",
//     category: "Marketing",
//     city: "Delhi",
//     time: "Full Time",
//     salary: "₹45k - ₹65k",
//     logo: "https://picsum.photos/200/300?random=15",
//     tags: ["Private", "Remote"],
//     description: `Lead our marketing campaigns across digital channels to drive growth and engagement.`,
//     Key_responsibilities: [
//       "Plan and execute digital marketing campaigns.",
//       "Monitor and analyze campaign performance.",
//       "Manage social media channels and content.",
//       "Collaborate with designers and content writers.",
//       "Optimize campaigns for better ROI and engagement."
//     ],
//     Skill: [
//       "3+ years experience in digital marketing.",
//       "Knowledge of SEO, SEM, and social media marketing.",
//       "Experience with Google Analytics and Ads.",
//       "Strong communication and analytical skills.",
//       "Ability to manage multiple campaigns simultaneously."
//     ]
//   },
//   {
//     id: 5,
//     title: "Data Analyst",
//     company: "Insight Analytics",
//     category: "Data",
//     city: "Pune",
//     time: "Full Time",
//     salary: "₹40k - ₹60k",
//     logo: "https://picsum.photos/200/300?random=16",
//     tags: ["Urgent"],
//     description: `Analyze business data, create dashboards, and provide actionable insights to stakeholders.`,
//     Key_responsibilities: [
//       "Collect and clean data from multiple sources.",
//       "Create dashboards and visualizations.",
//       "Perform statistical analysis and reporting.",
//       "Collaborate with business teams for insights.",
//       "Maintain data quality and documentation."
//     ],
//     Skill: [
//       "Proficient in Excel, SQL, and Python/R.",
//       "Experience with BI tools (Tableau, Power BI).",
//       "Strong analytical and problem-solving skills.",
//       "Ability to communicate insights effectively.",
//       "Attention to detail and accuracy."
//     ]
//   },
//   {
//     id: 6,
//     title: "HR Manager",
//     company: "PeopleFirst",
//     category: "HR",
//     city: "Chennai",
//     time: "Full Time",
//     salary: "₹50k - ₹70k",
//     logo: "https://picsum.photos/200/300?random=17",
//     tags: ["Private", "Urgent"],
//     description: `Manage HR operations including recruitment, employee engagement, and compliance.`,
//     Key_responsibilities: [
//       "Lead recruitment and onboarding processes.",
//       "Manage employee relations and engagement activities.",
//       "Ensure compliance with labor laws.",
//       "Develop HR policies and procedures.",
//       "Monitor and improve HR metrics and performance."
//     ],
//     Skill: [
//       "3+ years experience in HR management.",
//       "Knowledge of labor laws and compliance.",
//       "Strong interpersonal and communication skills.",
//       "Experience with HR software (HRIS, ATS).",
//       "Ability to handle confidential information professionally."
//     ]
//   }
// ])
let [jobs,setJobs]=useState([])
let [candidates,setCandidate]=useState([])
const fetchCandidate = async () => {
  try {
    const res = await axios.get("/api/candidate/all-profiles");
    setCandidate(res.data.data);
    
  } catch (error) {
    console.log(error);
  }
};
const fetchJobs =async()=>{
  try {
    const job =await axios.get("/api/job/allJobs");
    setJobs(job.data.data)
  } catch (error) {
    console.log(error);
  }
}
useEffect(()=>{
  fetchCandidate(),
  fetchJobs()
},[])
//   let [candidates,setCandidate]=useState([
//   {
//     id: 1,
//     name: "Rahul Sharma",
//     category: "MERN Stack Developer",
//     city: "Indore",
//     experience: "3 Years",
//     salary: "₹6 LPA",
//     skills: ["React", "Node.js", "MongoDB"],
//     availability: "Full Time",
//     Age: "28 Years",
//     Expected_Salary: "₹10-15 LPA",
//     Gender: "Male",
//     Language: "English",
//     Education: "Master Degree",
//     image: "https://picsum.photos/200/300?random=1",
//     description: `Rahul Sharma is a skilled MERN Stack Developer with 3 years of experience building scalable and high-performance web applications. He specializes in React for interactive front-end interfaces, Node.js for backend services, and MongoDB for efficient database management. Rahul has developed multiple real-world projects including e-commerce platforms, admin dashboards, and RESTful API services. He focuses on writing clean, maintainable, and reusable code following best development practices.
 
// He holds a Master’s Degree and has strong analytical skills that help him translate business requirements into technical solutions. Rahul is experienced in API integration, authentication systems, and performance optimization. He collaborates effectively within agile teams and communicates clearly in English. Currently earning ₹6 LPA, he is seeking opportunities offering ₹10–15 LPA where he can contribute to innovative projects and continue enhancing his expertise in modern JavaScript technologies.`
//   },
//   {
//     id: 2,
//     name: "Priya Verma",
//     category: "Frontend Developer",
//     city: "Bangalore",
//     experience: "4 Years",
//     salary: "₹8 LPA",
//     skills: ["React", "JavaScript", "CSS"],
//     availability: "Full Time",
//     Age: "27 Years",
//     Expected_Salary: "₹12-16 LPA",
//     Gender: "Female",
//     Language: "English",
//     Education: "B.Tech",
//     image: "https://picsum.photos/200/300?random=2",
//     description: `Priya Verma is a creative Frontend Developer with 4 years of experience designing responsive and user-friendly web interfaces. She specializes in React, modern JavaScript, and advanced CSS techniques to build engaging digital experiences. Priya has worked on enterprise dashboards, SaaS platforms, and e-commerce websites focusing on performance and accessibility.

// She holds a B.Tech degree and follows best UI/UX practices to ensure seamless interaction across devices. Her strengths include component-based architecture, state management, API integration, and cross-browser compatibility. She works efficiently in agile teams and values clean, scalable code. Currently earning ₹8 LPA, she is seeking growth-oriented roles offering ₹12–16 LPA where she can lead frontend projects and contribute to innovative product development.`
//   },
//   {
//     id: 3,
//     name: "Amit Patel",
//     category: "Backend Developer",
//     city: "Pune",
//     experience: "5 Years",
//     salary: "₹10 LPA",
//     skills: ["Node.js", "Express", "MongoDB"],
//     availability: "Full Time",
//     Age: "30 Years",
//     Expected_Salary: "₹15-18 LPA",
//     Gender: "Male",
//     Language: "English",
//     Education: "B.E",
//     image: "https://picsum.photos/200/300?random=3",
//     description: `Amit Patel is an experienced Backend Developer with 5 years of expertise in building secure and scalable server-side applications. He works extensively with Node.js and Express to create RESTful APIs and microservices architectures. Amit has strong experience in database design using MongoDB and optimizing queries for performance.

// He has contributed to fintech and healthcare platforms ensuring data security and high availability. Amit is skilled in authentication systems, payment gateway integrations, and cloud deployment. With a B.E degree and strong debugging skills, he delivers efficient solutions aligned with business needs. Currently earning ₹10 LPA, he is looking for senior backend roles offering ₹15–18 LPA to further expand his leadership and architectural expertise.`
//   },
//   {
//     id: 4,
//     name: "Sneha Iyer",
//     category: "Full Stack Developer",
//     city: "Hyderabad",
//     experience: "6 Years",
//     salary: "₹12 LPA",
//     skills: ["React", "Node.js", "MySQL"],
//     availability: "Full Time",
//     Age: "31 Years",
//     Expected_Salary: "₹18-22 LPA",
//     Gender: "Female",
//     Language: "English",
//     Education: "MCA",
//     image: "https://picsum.photos/200/300?random=4",
//     description: `Sneha Iyer is a seasoned Full Stack Developer with 6 years of experience building complete web solutions from frontend to backend. She is proficient in React for dynamic interfaces and Node.js for backend services, along with MySQL database management. Sneha has successfully led multiple product development cycles.

// She holds an MCA degree and has strong expertise in system design, API architecture, and deployment strategies. She focuses on clean coding standards and performance optimization. Currently earning ₹12 LPA, she is aiming for leadership-oriented roles offering ₹18–22 LPA where she can mentor teams and architect scalable solutions.`
//   },
//   {
//     id: 5,
//     name: "Vikram Singh",
//     category: "React Developer",
//     city: "Delhi",
//     experience: "3 Years",
//     salary: "₹7 LPA",
//     skills: ["React", "Redux", "JavaScript"],
//     availability: "Full Time",
//     Age: "26 Years",
//     Expected_Salary: "₹11-14 LPA",
//     Gender: "Male",
//     Language: "English",
//     Education: "BCA",
//     image: "https://picsum.photos/200/300?random=5",
//     description: `Vikram Singh is a passionate React Developer with 3 years of experience building modern single-page applications. He specializes in component-based architecture, Redux state management, and performance optimization. Vikram has worked on CRM systems and SaaS dashboards.

// He holds a BCA degree and follows best UI practices to deliver seamless user experiences. He is detail-oriented and focuses on reusable and scalable code structures. Currently earning ₹7 LPA, he is seeking challenging opportunities offering ₹11–14 LPA to enhance his frontend expertise.`
//   }
// ])
  return (
    <div ><jobsContext.Provider value={{jobs,setJobs}}>
      <candidateContext.Provider value={{candidates,setCandidate}}>

      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/jobs' element={<FindJobs/>}></Route>
      <Route path='/candidates' element={<FindCandidates/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/candidateRegister' element={<Register/>}></Route>
      <Route path='/employeRegistration' element={<Employeregistration/>}></Route>
      <Route path='/candidateprofile' element={<CandiateProfile/>}></Route>
      <Route path='/employeprofile' element={<EmployerProfile/>}></Route>
      <Route path='/viewJobDetail/:id' element={<ViewApplyJobCandidateDetail/>}></Route>
      <Route path="/Profile/:name" element={<Profile />} />
        <Route path="/job/:id" element={<JobDetails />} />
      </Routes>
      <Footer/>
      </candidateContext.Provider>
      </jobsContext.Provider>
    </div>
  )
}

export default App
