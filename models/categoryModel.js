const mongoose = require('mongoose');

const schema = mongoose.Schema;

const categoryModel = new schema({
    categroyName:{
        type:String
    },
    
},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model('categoryModel',categoryModel);