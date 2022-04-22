const express = require("express");
const {createAdmin} = require("../controllers/admin");

const adminRoute = express.Router();

adminRoute.get("/", (req, res)=>{
    res.json({ msg : "this is dashboard" });
});

adminRoute.post("/create-admin", createAdmin);

module.exports = adminRoute;