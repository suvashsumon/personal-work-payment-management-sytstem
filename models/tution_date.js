const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tutionDateSchema = new Schema({
    date : {type: Number, required : true},
    month : {type: String, required : true},
    year : {type: String, required : true},
    notes : {type: String, required : false},
    student : {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    }
});

const TutionDate = mongoose.model("TutionDate", tutionDateSchema);

module.exports = TutionDate;