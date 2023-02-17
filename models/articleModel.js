const mongoose = require('mongoose');

const schema = mongoose.Schema;

const articleModel = new schema({
    name:{
        type:String
    },
    text:{
        type:String
    },
    authorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        
    },
    categroyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoryModel",
    }
},{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model('articleModel',articleModel);