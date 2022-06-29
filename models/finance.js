const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const financeSchema = new Schema({
    amount : {type: Number, required : true},
    description : {type: String, required : true},
    type : {type: String, enum : ['debit', 'credit'], required : true},
    date : {type: String, required: true},
    account : {type: String, enum : ['DBBL', 'EBL', 'AB', 'IBBL'], required: true}
});

const Finance = mongoose.model("Finance", financeSchema);

module.exports = Finance;