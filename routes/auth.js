const express = require("express");
const {signInController} = require('../controllers/auth');

const authRoute = express.Router();

authRoute.get("/login", (req, res)=>{
    res.render("login");
});

authRoute.post("/login", signInController);

module.exports = authRoute;