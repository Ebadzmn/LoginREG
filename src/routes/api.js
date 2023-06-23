const express = require ("express")
const router = express.Router();
const {register, login, updateProfile} = require ("../controller/userC")
const {requireSignin} = require ("../middleware/auth")

router.post ("/register", register)
router.post ("/login", login)
router.post ("/updateProfile" , requireSignin, updateProfile)

module.exports = router