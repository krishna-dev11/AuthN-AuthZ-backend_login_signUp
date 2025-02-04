const mongoose = require("mongoose");
require("dotenv").config();


const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL , {
        useNewUrlParser:true,
        useUnifiedTopology : true
    })
    .then(()=>{console.log("db connection successfull")})
    .catch((err)=>{
        console.log("db connection failed");
        console.log(err);
        process.exit(1);
           
    })
}

module.exports = dbconnect;