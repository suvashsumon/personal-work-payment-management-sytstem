const bcrypt = require("bcrypt");
const Users = require("../models/user");

exports.loginController = (req, res)=>{
	// creating token
	const token = jwt.sign({id : 2, role : "admin"}, process.env.SECRET_KEY);
	// saving token to cookie
	res.cookie("access_token", token, {
		httpOnly: true
	});
	console.log(token);
	res.json({message : "Cookie set successfully."});
};

exports.signInController = (req, res)=>{
	Users.findOne({username : req.body.username, password : req.body.password}).then((user)=>{
		console.log("find user");
		res.redirect('/dashboard');
	}).catch((err)=>{
		console.log("could not find user");
		res.redirect("/auth/login");
	});

};