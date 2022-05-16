const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseAttendenceSchema = new Schema({
    date : {type: String, required : true},
    is_present : {type: Boolean, required : true},
    notes : {type: String, required : false},
    course : {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
});

const CourseAttendence = mongoose.model("CourseAttendence", courseAttendenceSchema);

module.exports = CourseAttendence;