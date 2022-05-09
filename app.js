const express = require("express");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config();

const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const utilRoute = require("./routes/utilRoute");

const loginController = require("./controllers/auth");

const conn = mongoose.connect(process.env.DATABASE_URL);
conn.then((db)=>{
  console.log("Successfully connect to database.");
}, (err)=>{
  console.log("Database connection failed");
})

const PORT = process.env.PORT;

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());

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