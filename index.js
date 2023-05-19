const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users")

const app = express();

dotenv.config();
mongoose
.connect(process.env.DB_URL)
.then(()=>console.log("Databse Connected Successfully !!!"))
.catch((error)=>console.log(error.message));

app.get("/api/test",()=>{
    console.log("Test is Successfull");
})

app.use("/api/user",userRoute);
 
app.listen(process.env.PORT || 5000 ,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})