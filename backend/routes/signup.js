var kafka = require('../kafka/client');

var express = require('express');
var router = express.Router();
var config = require('../config/settings');
var jwt = require('jsonwebtoken');

var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);

//Traveler Sign Up
router.post('/', function (req, res) {
    console.log("Post Sign Up Request");
    kafka.make_request('signup',req.body, function(err,accountCreated){
       
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
        
            if(accountCreated)
            {
                console.log("Account created with username: ", req.body.username);
                res.cookie('cookie', req.body.username, { httpOnly: false, path: '/' });
                req.session.user = req.body.username;
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })

                const data =
                {
                    authFlag: true,
                    login_status: "Account Created",
                    username: req.body.username,
                    type: "traveler"
                }
                var token = jwt.sign(data, config.secret, {
                    expiresIn: 10080 // in seconds
                });

                data.token = token;
                res.end(JSON.stringify(data));
               
            }
            else
            {
                console.log("Username ", req.body.username, " exists in database");
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                })
    
                const data =
                {
                    authFlag: false,
                    login_status: "Username exists"
                }
                res.end(JSON.stringify(data));

            }
         
            }
        res.end();
    });


});

module.exports =  router;