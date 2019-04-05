var kafka = require('../kafka/client');

var express = require('express');
var router = express.Router();
var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});

router.post('/', function (req, res) {
    console.log("Route to Messages: ", req.body);
    kafka.make_request('sendmessage',req.body, function(err,messageSent){ 
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else 
        {
            res.writeHead(200, {})
            console.log("Message Sent From ", req.body.sender, " to ", req.body.receiver);
            res.end();
        }
    })
 
  
});


router.get('/:user',/*requireAuth,*/ function (req, res) {
    console.log("Messages: ", req.params);
    kafka.make_request('displaymessages',req.params, function(err,messages){ 
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else 
        {
            console.log(messages);
            console.log("Messages Sent to FrontEnd");
            res.end(JSON.stringify(messages));
        }
    })
 
  
});

module.exports =  router;