const express = require("express");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(cookieparser());

// routes are placed here
app.get('/', (req, res)=>{
	// creating token
	const token = jwt.sign({id : 2, role : "admin"}, process.env.SECRET_KEY);
	// saving token to cookie
	res.cookie("access_token", token, {
		httpOnly: true
	});
	console.log(token);
	res.json({message : "Cookie set successfully."});
});

app.get("/token", (req, res, next) => {
	// geting the saved token named "access_token"
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
	console.log("no token found");
  }
  console.log("i am here");
  try {
	  // verifying the stored token and fetch the data.
    const data = jwt.verify(token, process.env.SECRET_KEY);
    console.log(data.id);
	console.log(data.role);
    //return next();
	res.json({userid : data.id, role : data.role});
  } catch {
    return res.sendStatus(403);
  }
});

app.get("/reset", (req, res)=>{
	return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});

app.get("/login", (req, res) => {
  const token = jwt.sign({ id: 7, role: "captain" }, "YOUR_SECRET_KEY");
  return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "Logged in successfully 😊 👌" });
});

// routes end here

app.listen(PORT, ()=>{
	console.log("Server is running....");
});