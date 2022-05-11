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

exports.signInController = async (req, res)=>{
	console.log(req.body.username);
	console.log(req.body.password);
	let user = await Users.findOne({username : req.body.username, password : req.body.password});
	//console.log(user[0].username);
	if(user){
		console.log("i am find user");
		//return res.json(user);
		const token = jwt.sign({ id : user._id, username : user.username}, process.env.SECRET_KEY);
		res.cookie("access_token", token, {
			httpOnly : true
		});
		res.redirect("/dashboard");
	}else{
		console.log("could not find user");
		res.redirect("/auth/login");
	}
};

exports.logOutController = (req, res)=>{
	res.clearCookie("access_token");
	res.redirect("/auth/login");
}