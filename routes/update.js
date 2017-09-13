const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;


router.get("/",function(req,res,next){
    res.render("update");
});

router.post("/",function(req,res,next){
    MongoClient.connect("mongodb://127.0.0.1:27017/test",(err,db)=>{
       if(err) throw err;
       var query={"name": req.body.name};
       var doc = {
            "name" : req.body.name,
            "category" : req.body.category,
            "location":[parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
        }
        db.collection("locations1").update(query,doc, function(err,numUpdate){
        	if(err) throw err;
            res.end("successfully updated"+ numUpdate);
            return db.close();
        }); 
       
    });
});


module.exports = router;