var kafka = require('../kafka/client');

var express = require('express');
var router = express.Router();


var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);
var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});


//Getting User Profile
router.get('/:username',/*requireAuth,*/ function (req, res) {

    //console("RA: ", requireAuth);
    console.log("Getting User Profile");
   
    kafka.make_request('getprofile',req.params, function(err,response){
        
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(response)
        {
            console.log(response);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(response));
        }
       
    })
   
}
);

//Update Profile Post Request
router.post('/', function (req, res) {
    console.log("Updating User Profile");


    kafka.make_request('updateprofile',req.body, function(err,profileUpdated){
        
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(profileUpdated)
        {
            res.end("Updated");
        }
        else
        {
          res.end();
        }
    })
   
   


})

module.exports =  router;