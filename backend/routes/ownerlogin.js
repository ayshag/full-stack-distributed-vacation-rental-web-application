var kafka = require('../kafka/client');

var express = require('express');
var router = express.Router();
var config = require('../config/settings');
var jwt = require('jsonwebtoken');

var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);

//Owner Login Post Request
router.post('/', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log("Owner Login Post Request");
    console.log("Username:", username + " password:", password);


    kafka.make_request('ownerlogin',req.body, function(err,ownerloggedin){
        
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            
            if(ownerloggedin)
            {
                res.cookie('cookie', req.body.username, { httpOnly: false, path: '/' });

                req.session.user = req.body.username;
                console.log("Logged in as " + req.body.username);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                const data =
                {
                    authFlag: true,
                    username: req.body.username,
                    login_status: "Logged In",
                    type: "owner"
                }
                var token = jwt.sign(data, config.secret, {
                    expiresIn: 10080 // in seconds
                });

                data.token = token;
                res.end(JSON.stringify(data));
            }

            else
            {
                console.log("User information invalid");
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                })

                const data =
                {
                    authFlag: false,
                    login_status: "Invalid Information"
                }
                res.end(JSON.stringify(data));

            }
         
            }
        res.end();
    });


   
})


  
module.exports =  router;