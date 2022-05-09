const express = require("express");
const {createAdmin, addClient, addProject} = require("../controllers/admin");
const {isAuthenticated} = require("../middlewares/auth");

const adminRoute = express.Router();

adminRoute.get("/", isAuthenticated, (req, res)=>{
    res.json({ msg : "this is dashboard" });
});

adminRoute.post("/create-admin", createAdmin);

adminRoute.post("/add-client", addClient);
adminRoute.post("/add-project", addProject);

module.exports = adminRoute;