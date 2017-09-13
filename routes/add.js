const express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

router.get("/",function(req,res,next){
    res.render('add', { title: 'Add Location'});
});

var create2dIndex = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('locations1');
  // Create the index
  collection.createIndex(
    { location : "2d" }, function(err, result) {
    console.log(result);
    callback(result);
  });
};

router.post("/",function(req,res,next){
    MongoClient.connect("mongodb://127.0.0.1:27017/test",(err,db)=>{
        if(err) throw err;
        var doc = {
            "name" : req.body.name,
            "category" : req.body.category,
            "location":[parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
        }
        db.collection("locations1").insert(doc,function(err,docInserted){
            console.log(err);
            if(err) throw error;
            res.end("successfully added a new location");
            create2dIndex(db, function() {
    			return db.close();
  			});                     
        });

    });
});

module.exports = router;