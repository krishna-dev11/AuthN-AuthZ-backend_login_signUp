const express = require("express");
const router = express.Router();


const {SignUpController} = require("../controllers/Auth");
const {LoginController } = require("../controllers/Auth")
// const {StudentRoute} = require("../controllers/ProtectedRoute")

const {auth , isStudent , isAdmin} = require("../Middleware/authmiddleware")

router.post('/SignUp' , SignUpController);
router.post('/login' , LoginController);


//protected routes

router.get('/student' , auth , isStudent ,  (req , res)=>{
    res.status(200).json({
        success:true,
        message:"well come to protected route for student"
    })
})

router.get('/admin' , auth , isAdmin ,  (req , res)=>{
    res.status(200).json({
        success:true,
        message:"well come to protected route for Admin"
    })
})



module.exports = router ;