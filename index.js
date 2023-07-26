const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
dotenv.config();
const paymentRoute = require("./routes/stripe")
const cors = require("cors");

const app = express();


mongoose
.connect(process.env.DB_URL)
.then(()=>console.log("Databse Connected Successfully !!!"))
.catch((error)=>console.log(error.message));

// one way 
app.get("/api/test",()=>{
    console.log("Test is Successfull");
})

// another way
//payment block na ho
app.use(cors())

app.use(express.json());
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);
app.use("/api/checkout",paymentRoute);
 

app.listen(process.env.PORT || 5000 ,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})