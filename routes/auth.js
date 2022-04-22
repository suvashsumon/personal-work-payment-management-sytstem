const express = require("express");
const {signInController, logOutController} = require('../controllers/auth');
const {isLoggedIn} = require('../middlewares/auth');

const authRoute = express.Router();

authRoute.get("/login", isLoggedIn, (req, res)=>{
    res.render("login");
});

authRoute.post("/login", signInController);
authRoute.get("/logout", logOutController);

module.exports = authRoute;