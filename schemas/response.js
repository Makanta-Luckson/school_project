    const mongoose = require('mongoose');

    const Schema = mongoose.Schema;

    const responseSchema = new Schema({

        id : {type : String, required : true},
        code : {type : String, required : true},
        status : {type : String, required : true},
        comment :{ type: String}
    });

    const ResponseModel = mongoose.model('respnse', responseSchema);

    module.exports = ResponseModel;