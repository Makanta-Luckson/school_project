const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    userNames : {type : String, required : true},
    name : {type : String, required : true},
    code : {type : String, required : true},
    id : {type : String, required : true},
    senderId : {type : String, required : true}
}, {timestamps : true});


const requestModel = mongoose.model('request', requestSchema);
module.exports = requestModel;

