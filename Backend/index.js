  let express = require("express");
  const errorhandler = require("./middlewares/errorhandler.js");
  const cors = require("cors");
  const bodyparser = require("body-parser");
let app = express();

  const ConnectDB = require("./config/db.js")
  require("dotenv").config();

  ConnectDB()


  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());



  app.use(cors({
    origin: ["http://127.0.0.1:5500"
  ,"http://localhost:5173","http://localhost:5174","http://localhost:5175","http://localhost:5176,https://job-portal-2vj6.onrender.com"], credentials: true,  
  }));

  const path = require("path");

let candidateRegister =require("./routes/candidateRoute.js")
let organizationRegister =require("./routes/organizationRoute.js")
let job =require("./routes/jobRoute.js")

app.use("/api/candidate",candidateRegister)
app.use("/api/organization",organizationRegister)
app.use("/api/job",job)
 

 const __dirname1 = path.resolve();

app.use(express.static(path.join(__dirname1, "Frontend", "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname1, "Frontend", "dist", "index.html"));
});

  app.use(errorhandler)

  app.listen(4000, (err) => {
    console.log(err || "Server Run Port 4000")
  })

