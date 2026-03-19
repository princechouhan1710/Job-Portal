let jwt = require("jsonwebtoken");

let generatetoken = (details, secretKey, expiretime) => {
    token = jwt.sign({ ...details }, secretKey, { expiresIn: expiretime });
    return token
}

let decodetoken = (token, secretKey) => {
    token= jwt.verify(token, secretKey);
    return token
}

module.exports = { generatetoken, decodetoken };