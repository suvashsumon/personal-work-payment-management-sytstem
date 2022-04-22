const express = require("express");
const {createAdmin} = require("../controllers/admin");
const {isAuthenticated} = require("../middlewares/auth");

const adminRoute = express.Router();

adminRoute.get("/", isAuthenticated, (req, res)=>{
    res.json({ msg : "this is dashboard" });
});

adminRoute.post("/create-admin", createAdmin);

module.exports = adminRoute;