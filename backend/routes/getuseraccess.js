var kafka = require('../kafka/client');

var express = require('express');
var router = express.Router();
var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});


router.get('/:username', /*requireAuth,*/ function (req, res) {
    console.log("Checking Owner Access for : ", req.params.username);

    if (req.params.username != 'undefined') {

        kafka.make_request('getuseraccess',req.params, function(err,owner){

            if (err){
                console.log("Inside err");
                res.json({
                    status:"error",
                    msg:"System Error, Try Again."
                })
            }else if (owner)
            {
                console.log("User is Owner");
                res.end('owner');
            }
            else{
                console.log("User is not owner");
                res.end('traveler');
            }
        })
    }
})
       


module.exports =  router;