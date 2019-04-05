var kafka = require('../kafka/client');

var express = require('express');
var router = express.Router();
var config = require('../config/settings');
var jwt = require('jsonwebtoken');

var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);
//Owner Signup
router.post('/', function (req, res) {
    console.log(" Post OwnerSign Up Request");


    kafka.make_request('ownersignup',req.body, function(err,accountCreated){
        
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            
            if(accountCreated)
            {
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