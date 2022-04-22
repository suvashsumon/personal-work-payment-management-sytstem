const Users = require("../models/user");

exports.createAdmin = (req, res)=>{
    Users.create(req.body).then((resp)=>{
        res.json({ message : "Admin created successfully"});
    }).catch((err)=>{
        res.json({ message : "cannot create admin"});
    });
};