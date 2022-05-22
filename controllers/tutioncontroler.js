const ejs = require("ejs");
let path = require("path");
let pdf = require("html-pdf");

exports.getTutionIndex = (req, res)=>{
    res.render("tution_assistant/index");
};