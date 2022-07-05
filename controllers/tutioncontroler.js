const ejs = require("ejs");
let path = require("path");
let pdf = require("html-pdf");
const Student = require("../models/student");

exports.getTutionIndex = async (req, res)=>{
    try {
        let students = await Student.find({});
        res.render("tution_assistant/index", {'students' : students});
    } catch (error) {
        console.log(error);
    }
};

exports.addStudent = async (req, res)=>{
    let {name, cls, institute, subject, salary} = req.body;
    try {
        let student = new Student({
            name : name,
            cls : cls,
            institute : institute,
            subject : subject,
            salary : salary
        });
        await student.save();
        req.flash('success', 'Student added successfully!!')
        res.redirect('/dashboard/tution-assistant');
    } catch (error) {
        res.json(msg => "error");
    }
}