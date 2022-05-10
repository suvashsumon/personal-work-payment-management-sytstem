const express = require("express");
const {addClient, addProject, addClientView, addProjectView, setPaid, createInvoice} = require("../controllers/admin");
const {isAuthenticated} = require("../middlewares/auth");

const adminRoute = express.Router();

adminRoute.get("/", isAuthenticated, (req, res)=>{
    res.render("home");
});


adminRoute.post("/add-client", isAuthenticated, addClient);
adminRoute.get("/add-client", isAuthenticated, addClientView);
adminRoute.post("/add-project/:id", isAuthenticated, addProject);
adminRoute.get("/add-project/:id", isAuthenticated, addProjectView);
adminRoute.get("/set-paid/:id", isAuthenticated, setPaid);
adminRoute.get("/create-invoice/:id", isAuthenticated, createInvoice);

module.exports = adminRoute;