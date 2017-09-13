const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;


router.get("/",function(req,res,next){
    res.render("search", {result:false, errors:[]});
});

router.post("/",function(req,res,next){
	req.assert('category', "a valid category is required").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        res.render('search', {errors: errors ,result:false});
    }
    else {
	    MongoClient.connect("mongodb://127.0.0.1:27017/test",(err,db)=>{
	       if(err) throw err;
	       var query={location: {$near :[parseFloat(req.body.longitude),parseFloat(req.body.latitude)],
	                  }, 'category': req.body.category};
	       db.collection("locations1").find(query).limit(3).toArray( function (err,docsArr){
	       	   console.log(docsArr);
	       	   res.render("search", {docs: docsArr, result:true,errors:[] });
	       	   db.close();
	       });
	    });
	}    
});


module.exports = router;