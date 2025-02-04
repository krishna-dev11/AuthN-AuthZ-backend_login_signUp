const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req , res , next)=>{

    try{
        const token = req.body.token || req.cookie.token || req.header("Authorization").replace("Bearer" , "");

    if(!token || token == undefined){
        return res.status(401).json({
            success:false,
            message:"there should be some error in fetching of token"
        })
    }

    try{
       const payload = jwt.verify(token , process.env.SECRET_KEY) ;
       req.user = payload;
    }catch(error){
       return res.status(401).json({
        success:false,
        message:"token is not matched"
       })
    }
    next();

    } catch(error){
        return res.status(500).json({
            success:"false",
            message:"there should be some error in fetching of token"
        })
    }

}

 exports.isStudent = (req ,res , next)=>{
    try{
       if(req.user.role !== "student"){
        return res.status(401).json({
            success:false,
            message:"you can't allowed for student's protected route"
        })
       }
    }catch(error){
      return res.status(500).json({
        success:"false",
        message:"error in fetching of role of the user"
      })
    }
    next();
 }


 exports.isAdmin = (req ,res , next)=>{
    try{
       if(req.user.role !== "Admin"){
        return res.status(401).json({
            success:false,
            message:"you can't allowed for Admin's protected route"
        })
       }
    }catch(error){
      return res.status(500).json({
        success:"false",
        message:"error in fetching of role of the user"
      })
    }
    next();
 }
