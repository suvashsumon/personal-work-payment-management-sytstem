const express = require("express");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const session = require('express-session');
const flash = require('connect-flash');
let pdf = require("html-pdf");
require("dotenv").config();

const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const utilRoute = require("./routes/utilRoute");

const loginController = require("./controllers/auth");

const conn = mongoose.connect(process.env.DATABASE_URL_LOCAL);
conn.then((db)=>{
  console.log("Successfully connect to database.");
}, (err)=>{
  console.log("Database connection failed");
})

const PORT = process.env.PORT;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use('/invoices', express.static(__dirname + '/invoices'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(session({
  secret:'myownproject',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(function(req, res, next){
  res.locals.message = req.flash();
  next();
});

// routes are placed here
app.use("/dashboard", adminRoute);
app.use("/auth", authRoute);
app.use("/create-admin", utilRoute);
app.get('/', (req, res)=>{
  res.render("login");
});


app.listen(PORT, ()=>{
	console.log("Server is running....");
});