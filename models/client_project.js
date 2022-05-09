const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientProjectSchema = new Schema({
    title : {type: String, required : true},
    description : {type: String, required : true},
    notes : {type: String, required : true},
    requried_times : {type: String, required : true},
    bill : {type: Number, required : true},
    paid : {type: Boolean, default : false},
    client : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const ClientProject = mongoose.model("ClientProject", clientProjectSchema);

module.exports = ClientProject;