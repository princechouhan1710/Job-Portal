const { ObjectId } = require("mongodb");
let Candidate =require("../models/candidateModel")
const { decodetoken } = require("../utils/token");
const Organization = require("../models/organisationModel");
const jwt = require("jsonwebtoken");

let auth = async (req, res, next) => {
    try {
        let token = req.headers.token || null;
 
        if (!token) {
            return res.status(500).json({ success: false, message: "Please provide token" })
        }
        let decodedvalue = await decodetoken(token, process.env.SECRETKEY);
        let user = await Candidate.findOne({ "_id": new ObjectId(decodedvalue.userid) })
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
let authOrg = async (req, res, next) => {
    try {
        let token = req.headers.token || null;
 
        if (!token) {
            return res.status(500).json({ success: false, message: "Please provide token" })
        }
        let decodedvalue = await decodetoken(token, process.env.SECRETKEY);
        let user = await Organization.findOne({ "_id": new ObjectId(decodedvalue.userid) })
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const authMiddleware = (req, res, next) => {
  try {

    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRETKEY);

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }
};
 
module.exports={auth,authOrg,authMiddleware}