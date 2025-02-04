const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const route = require("./Routes/routes");
app.use("/api/v1" , route);

app.listen( process.env.PORT , ()=>{
    console.log(`app listen at port ${process.env.PORT}`)
} );

const dbconnect = require("./config/database")
dbconnect();

app.get("/" , (req , res)=>{
    res.send("<h1> these is home page baby for authN and authZ </h1>")
});