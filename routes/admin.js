const express = require("express");

const adminRoute = express.Router();

adminRoute.get("/", (req, res)=>{
    res.json({ msg : "this is dashboard" });
});


module.exports = adminRoute;