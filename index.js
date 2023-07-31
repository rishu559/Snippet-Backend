const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const snippetRoute = require("./routes/snippet");

dotenv.config();

const cors = require("cors");

const app = express();
app.use(cors());

// dotenv.config();
mongoose.set("strictQuery", true);
let message = "";
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    message = "mongodb connected";
    console.log("DB connected successfully...");
  })
  .catch((err) => console.log(err));
  

// mongoose
//   .connect(process.env.DB_URL)
//   .then(() => console.log("Databse Connected Successfully !!!"))
//   .catch((error) => console.log(error.message));

// one way
app.get("/", (req,res) => {
  console.log("Test is Successfull");
  return res.send("Hello");
});

// another way
//payment block na ho

app.use(express.json());

app.use("/api/snippet", snippetRoute);

// app.use("/api/checkout",paymentRoute);

app.listen(5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
