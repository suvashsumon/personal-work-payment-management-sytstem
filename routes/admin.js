const express = require("express");
const {createAdmin, addClient, addProject, getClient, addClientView} = require("../controllers/admin");
const {isAuthenticated} = require("../middlewares/auth");

const adminRoute = express.Router();

adminRoute.get("/", isAuthenticated, (req, res)=>{
    res.json({ msg : "this is dashboard" });
});


adminRoute.post("/add-client", addClient);
adminRoute.get("/add-client", addClientView);
adminRoute.post("/add-project", addProject);
adminRoute.get("/get-client/:id", getClient);

module.exports = adminRoute;