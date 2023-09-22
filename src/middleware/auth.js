const jwt = require("jsonwebtoken");
const User = require("../model/userM");
require("dotenv").config();


exports.requireSignin = (req,res,next)  => {
    try {
        const decoded = jwt.verify(
            req.headers.token,
            process.env.JWT_SECRET
        );
            let email = decoded.email;
            let id = decoded._id;
            req.headers.email = email;
            req.headers._id = id;
        next();
    } catch (error) {
        return res.status(401).json(error)
    }
}

exports.isAdmin = async (req,res,next) => {
    try {
        const user = await User.findById(req.headers._id);
        if(user.role === "admin"){
            next();
        }else{
            return res.status(401).json({message:"Admin resource. Access denied"})
        }
    } catch (error) {
        return res.status(401).json(error)
    }
}