const  Login_SignUp = require("../Models/login_signUpModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { options } = require("../Routes/routes");
require("dotenv").config();

exports.SignUpController = async(req , res)=>{
    
    try{
        const {name , email , password , role} = req.body;

    if(!name || !email || !password || !role)
    {
        return res.status(400).json({
            success:false,
            message: "fill all data carefully"
        })
    }

    const existingUser = await Login_SignUp.findOne({email});

    if(existingUser)
    {
        return res.status(400).json({
            success:false,
            message:"entry already exist in DB for these SignUp request , so go to login page and start login using password"
        })
    }

    let hasedpassword ;
    try{
        hasedpassword = await bcrypt.hash(password , 10);
    } catch(err){
        return res.status(401).json({
            success:false,
            message:"error in hasing of password"
        });
    }

    const signUp_a_user = await  Login_SignUp.create({name , email , password:hasedpassword , role})
    
    return res.status(200).json({
        success:true,
        data:signUp_a_user,
        message:" user successfully signUp" 
    })
    } catch(err){
       return  res.status(500).json({
            success:false,
            message:"there should be some error in signUp of user"
        })
    }

} 


exports.LoginController = async(req , res)=>{
    try{
       const {email , password } = req.body;

       if(!email || !password){
        return res.status(401).json({
            success:false,
            message:"fill all data carefully"
        })
       }

       const user = await Login_SignUp.findOne({email});

       if(!user)
       {
         return res.status(401).json({
            success:false,
            message:"no data exist for these login request"
         })
       }


       const payload ={
        email:user.email,
        id:user._id,
        role:user.role
       }
       if(await bcrypt.compare(password , user.password))
       {
            let token = jwt.sign(payload,
                                 process.env.SECRET_KEY,
                                 {
                                    expiresIn:"2h"
                                 }
            )
            // user = user.toObject();
            user.token = token,
            user.password = undefined

            res.cookie("token" , token , options).status(200).json({
                success:true,
                token, //body 
                user, //header banega ye baad me
                message:"user logIn successfully"
            })
       }else{
        return res.status(400).json({
            success:false,
            message:" password is incorrect"
        })
       }

    } catch(err){
          return res.status(500).json({
            success:false,
            message:"there should be some error in login a user",
          })
    }
}

