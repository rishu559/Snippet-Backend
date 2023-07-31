const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const snippetRoute = require("./routes/snippet");

dotenv.config();

const cors = require("cors");

const app = express();

// mongoose
//   .connect(process.env.DB_URL)
//   .then(() => console.log("Databse Connected Successfully !!!"))
//   .catch((error) => console.log(error.message));

// one way
app.get("/api/test", () => {
  console.log("Test is Successfull");
});

// another way
//payment block na ho
app.use(cors());

app.use(express.json());

app.use("/api/snippet", snippetRoute);

// app.use("/api/checkout",paymentRoute);

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
