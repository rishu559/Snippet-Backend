const express = require("express");
const router = express.Router();

router.get("/userTest",(req,res)=>{
    res.send("test successfull");
})

module.exports = router