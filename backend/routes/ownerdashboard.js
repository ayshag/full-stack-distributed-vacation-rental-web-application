var kafka = require('../kafka/client');

var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});



router.get('/:username',/*requireAuth,*/ function (req, res) {
    console.log("Getting properties owned by owner that are  booked by travelers");

    kafka.make_request('ownerdashboard_bookings',req.params, function(err,ownerdashboardbookings){ 
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else if(ownerdashboardbookings)
            {
                var next = true;
                for (var i = 0; i < ownerdashboardbookings.length; i++) {
                    var counter = 1; var imagecounter = 0;
                    next = true;
                    //ownerdashboardbookings[i] = ownerdashboardbookings[i].toJSON();
                    ownerdashboardbookings[i].images = [];
                    while (next) {
                        var file = ownerdashboardbookings[i].propertyname + '_photo' + counter + '.jpg';
                        
                        var fileLocation = path.join(__dirname, '/../uploads', file);
                        var img; var base64img;
                        try {
                            img = fs.readFileSync(fileLocation);
                            base64img = new Buffer(img).toString('base64');
                            ownerdashboardbookings[i].images[imagecounter] = base64img;
                            imagecounter++;
                            counter++;
                        }
                        catch(error)
                        {
                            next = false;
                        }
                    }
                }
                      
            res.end(JSON.stringify(ownerdashboardbookings));
            }
        })
/*
    properties.find({owner : req.params.username, trips_bookings : {$exists: true, $ne : []}}, function(error, result)
    {
        var returnresult = [];
        if(error)
            console.log(error);
        else if(result)
        {
            var next = true;
           for (var i = 0; i < result.length; i++) {
               for(var j = 0; j<result[i].trips_bookings.length; j++)
               {
                   returnresult.push(result[i].trips_bookings[j])
               }
                var counter = 1; var imagecounter = 0;
                next = true;
                result[i].images = [];
                while (next) {
                    var file = result[i].propertyname + '_photo' + counter + '.jpg';
                    console.log(file);
                    var fileLocation = path.join(__dirname + '/uploads', file);
                    var img; var base64img;
                    try {
                        img = fs.readFileSync(fileLocation);
                        base64img = new Buffer(img).toString('base64');
                        result[i].images[imagecounter] = base64img;
                        imagecounter++;
                        counter++;
                    }
                    catch
                    {
                        next = false;
                    }
                }
            }

            console.log(result);
           console.log("Returnig owner properties booked by travelers");
            res.end(JSON.stringify(result));
        
        }

        })*/
    })
    
    

module.exports =  router;