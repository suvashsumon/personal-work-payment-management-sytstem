const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title : {type: String, required : true},
    code : {type: String, required : true},
    credit : {type: String, required : true},
    teacher : {type: String, required : true},
    attendence : [{
        type: Schema.Types.ObjectId,
        ref: 'CourseAttendence',
        required: false
    }]
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;