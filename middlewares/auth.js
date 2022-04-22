const jwt = require("jsonwebtoken");

exports.isAuthenticated = (req, res, next)=>{
    const token = req.cookies.access_token;
    try {
	  // verifying the stored token and fetch the data.
    const data = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch {
    console.log("TOKEN ERROR : a error occurs during fetching token.");
    //return res.sendStatus(403);
    return res.redirect("/auth/login");
  }
};


exports.isLoggedIn = (req, res, next)=>{
    const token = req.cookies.access_token;
    try{
        console.log("TOKEN FOUND : user is already authenticated.");
        const data = jwt.verify(token, process.env.SECRET_KEY);
        return res.redirect("/dashboard");
    } catch {
        console.log("TOKEN NOT FOUND : user is not authenticate.");
        //return res.redirect("/auth/login");
        next();
    }
};