const mongoose = require("mongoose");

const Login_signUp_Schema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    }

});

module.exports = mongoose.model("Login_SignUp" , Login_signUp_Schema)