const jwt = require("jsonwebtoken");
const User = require("../model/userM");
require("dotenv").config();


exports.requireSignin = (req,res,next)  => {
    try {
        const decoded = jwt.verify(
            req.headers.token,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(error)
    }
}