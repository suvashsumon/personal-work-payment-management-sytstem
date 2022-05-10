const express = require("express");
const {createAdmin, addClient, addProject, getClient, addClientView} = require("../controllers/admin");
const {isAuthenticated} = require("../middlewares/auth");

const adminRoute = express.Router();

adminRoute.get("/", isAuthenticated, (req, res)=>{
    res.render("home");
});


adminRoute.post("/add-client", isAuthenticated, addClient);
adminRoute.get("/add-client", isAuthenticated, addClientView);
adminRoute.post("/add-project", isAuthenticated, addProject);
adminRoute.get("/get-client/:id", isAuthenticated, getClient);

module.exports = adminRoute;