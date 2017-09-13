const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;


router.get("/",function(req,res,next){
    res.render("delete");
});

router.post("/",function(req,res,next){
    MongoClient.connect("mongodb://127.0.0.1:27017/test",(err,db)=>{
       if(err) throw err;
       var query={"name": req.body.name};
       db.collection("locations1").remove(query, function(err,removed){
          if(err) throw err;
          console.log("remove:"+removed);
          res.end("successfully deleted a location");
          return db.close();
       });
    });
});

module.exports = router;