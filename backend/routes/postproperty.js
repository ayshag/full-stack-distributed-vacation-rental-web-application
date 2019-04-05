var kafka = require('../kafka/client');

var express = require('express');
var router = express.Router();


//Post Property Post Request
router.post('/',/*upload.single('selectedFile'),*/ function (req, res) {

    console.log("Inside Post Property Request");
    kafka.make_request('postproperty',req.body, function(err,propertyPosted){
        
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(propertyPosted)
        {
            console.log("Property Successfully Added");
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Success");
        }
        else
        {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            console.log("Property with same name already exists");
            res.end("Name exists");
        }
    })
    
});


module.exports =  router;