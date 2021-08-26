const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

first_name          :       {type : String, required : true},
last_name           :       {type : String, required : true},
email               :       {type : String, required : true},
number              :       {type : String, required : true},
dep                 :       {type : String, required : true},
sex                 :       {type : String, required : true},
role                :       {type : String, required : true}

}, {timestamps : true})

const User = mongoose.model('user', userSchema);
module.exports = { User };
 