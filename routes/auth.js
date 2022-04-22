const express = require("express");

const authRoute = express.Router();

authRoute.get("/login", (req, res)=>{
    res.render("login");
});

module.exports = authRoute;