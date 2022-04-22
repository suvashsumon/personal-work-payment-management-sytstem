const bcrypt = require("bcrypt");
const Users = require("../models/user");
const jwt = require("jsonwebtoken");

// exports.loginController = (req, res)=>{
// 	// creating token
// 	const token = jwt.sign({id : 2, role : "admin"}, process.env.SECRET_KEY);
// 	// saving token to cookie
// 	res.cookie("access_token", token, {
// 		httpOnly: true
// 	});
// 	console.log(token);
// 	res.json({message : "Cookie set successfully."});
// };

exports.signInController = (req, res)=>{
	Users.findOne({username : req.body.username, password : req.body.password}).then((user)=>{
		console.log("i am find user");
		const token = jwt.sign({ id : user._id, username : user.username}, process.env.SECRET_KEY);
		res.cookie("access_token", token, {
			httpOnly : true
		});
		res.redirect("/dashboard");
	}).catch((err)=>{
		console.log("could not find user");
		console.log(err);
		res.redirect("/auth/login");
	});
};

exports.logOutController = (req, res)=>{
	res.clearCookie("access_token");
	res.redirect("/auth/login");
}