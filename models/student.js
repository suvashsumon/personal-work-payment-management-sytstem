const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name : {type: String, required : true},
    cls : {type: String, required : true},
    institute : {type: String, required : true},
    subject : {type: String, required : true},
    salary : {type: Number, required : true}
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;