const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name : {type: String, required : true},
    phone : {type: String, required : true},
    email : {type: String, required : true},
    academic_info : {type: String, required : true},
    projects : [{
        type: Schema.Types.ObjectId,
        ref: 'ClientProject',
        required: false
    }]
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;