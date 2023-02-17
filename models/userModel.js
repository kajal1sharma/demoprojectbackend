const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userModel = new schema({
    name:{
        type:String
    },
    place:{
        type:String
    },
    emailid:{
        type:String
    }
},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model('userModel',userModel);