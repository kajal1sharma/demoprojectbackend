var express = require('express');
var router = express.Router();
var userDb = require('../models/userModel');
var articlesDb = require("../models/articleModel");
var categoryDb =require("../models/categoryModel");
const { default: mongoose } = require('mongoose');

/* create new article */
router.post('/',async function(req, res, next){
    try{
        let text= req.body.text;
        let name= req.body.name;
        let categoryId= req.body.categoryId;
        let authorId = req.body.authorId;
        
        let catID = mongoose.Types.ObjectId(categoryId);
        let catFound = await categoryDb.find({_id:catID}).limit(1);
        if (catFound && Array.isArray(catFound) && catFound.length) {
            let userID = mongoose.Types.ObjectId(authorId);  
            let authFound = await userDb.find({_id:userID}).limit(1);
            if (authFound && Array.isArray(authFound) && authFound.length) {

                let result = await new articlesDb({name:name,text:text,authorId:userID,categroyId:catID}).save();
                res.status(200).json({message:"success",result:result});
            } else {
                throw new Error("Invalid user Id")
            }
        } else {
            throw new Error("Invalid Categeory Id")
        }
    }
    catch(err){
        res.status(404).json({error:err});
    }
})

/* retrieve all articles */
router.get('/',async  function(req, res, next) {
    try{
        let articlesResult= await articlesDb.find();
        res.status(200).json({articles:articlesResult});
    }
    catch(err){
        res.status(404).json({error:err});
    }
  });

/* retrieve articles by id */
router.get('/:id', async function(req, res, next) {
    try{
        var articleId = mongoose.Types.ObjectId(req.params.id);
    
        articleFound = await articlesDb.find({_id:articleId}).limit(1);
        if (articleFound && Array.isArray(articleFound) && articleFound.length) {
            res.status(200).json({message:"success",result:articleFound});
        }
        else{
            throw new Error("Invalid article Id")
        }
    }
    catch(err){
        res.status(404).json({error:err});
    }
    });


/* update a article by id*/
router.put('/:id', async function(req, res, next) {
    try{
        var payload = req.body;
        var articleId = mongoose.Types.ObjectId(req.params.id);
        let categoryId= mongoose.Types.ObjectId(payload.categoryID);
        let authorID =  mongoose.Types.ObjectId(payload.authorID);
        articleFound = await articlesDb.find({_id:articleId}).limit(1);
        if (articleFound && Array.isArray(articleFound) && articleFound.length) {
            let result = await articlesDb.findOneAndUpdate({ _id: payload._id, name:payload.name, text:payload.text, authorId:authorId, categoryId:categoryID }, updateObj, { new: true })
            res.status(200).json({result:result});
        }
        else{
            throw new Error("Invalid article Id")
        }
    }
    catch(err){
        res.status(404).json({error:err});
    }
    });

/*delete article by id*/
router.delete('/:id', async function(req, res, next) {
        try{
            var payload = req.body;
            var articleId = mongoose.Types.ObjectId(req.params.id);
            articleFound = await articlesDb.find({_id:articleId}).limit(1);
            if (articleFound && Array.isArray(articleFound) && articleFound.length) {
                let result = await articlesDb.deleteOne({_id:articleId});
                res.json({result:result});
            }
            else{
                throw new Error("Invalid article Id")
            }
        }
        catch(err){
            res.status(404).json({error:err});
        }
        });

/////////////////////////////////////////////////////////

/* get articels by categroyid */
router.get('category/:categoryid', async function(req, res, next) {
    try{
        var categoryId = mongoose.Types.ObjectId(req.params.categoryid);
    
        categoryFound = await categoryDb.find({_id:categoryId}).limit(1);
        if (categoryFound && Array.isArray(categoryFound) && categoryFound.length) {
           let articles = await articlesDb.find({categroyId:categoryId});
            res.status(200).json({articles:articles});   
        }
        else{
            throw new Error("Invalid category Id")
        }
    }
    catch(err){
        res.status(404).json({error:err});
    }
    });


/* get articles by authorid */
router.get('author/:authorid', async function(req, res, next) {
    try{
        var authorId = mongoose.Types.ObjectId(req.params.authorid);
    
        authorFound = await userDb.find({_id:authorId}).limit(1);
        if (authorFound && Array.isArray(authorFound) && authorFound.length) {
           let articles = await articlesDb.find({categroyId:authorId});
            res.status(200).json({articles:articles});   
        }
        else{
            throw new Error("Invalid author Id")
        }
    }
    catch(err){
        res.status(404).json({error:err});
    }
    });
module.exports = router;