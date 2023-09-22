const express = require ("express")
const router = express.Router();
const {register, login, updateProfile,getUsers} = require ("../controller/userC")
const {requireSignin, isAdmin} = require ("../middleware/auth")
const {createProduct,CreateCategory,getCategory,UpdateProduct,getProduct,getProductById,deleteProduct} = require ("../controller/ProductC")
let {createTask,GetTaskByUser,listTaskByStatus,ListTaskByStatus,TaskBycount,UpdateTask} = require("../controller/Task");

router.post ("/register", register)
router.post ("/login", login)
router.post ("/updateProfile" , requireSignin, updateProfile)
router.get ("/getUsers", requireSignin,isAdmin,getUsers)
router.post ("/createProduct", requireSignin,isAdmin,createProduct)
router.post ("/createCategory", requireSignin,isAdmin,CreateCategory)
router.get ("/getCategory", requireSignin,isAdmin,getCategory)
router.put ("/updateProduct/:id", requireSignin,isAdmin,UpdateProduct)
router.get ("/getProduct", requireSignin,isAdmin,getProduct)
router.get ("/getProductById/:id", requireSignin,isAdmin,getProductById)
router.delete ("/deleteProduct/:id", requireSignin,isAdmin,deleteProduct)
router.post ("/createTask", requireSignin,createTask)
router.get ("/GetTaskByUser", requireSignin,GetTaskByUser)
// router.get ("/listTaskByStatus/:status", requireSignin,listTaskByStatus)
router.get ("/ListTaskByStatus/:status", requireSignin,ListTaskByStatus)
router.get ("/TaskBycount", requireSignin,TaskBycount)
router.put ("/UpdateTask/:id", requireSignin,UpdateTask)



module.exports = router