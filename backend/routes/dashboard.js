var kafka = require('../kafka/client');
const path = require('path');
const fs = require('fs');
var express = require('express');
var router = express.Router();

var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});

router.get('/:username'/*, requireAuth*/, function (req, res) {
   
    console.log("Getting Traveler Dashboard");
   
    kafka.make_request('dashboard',req.params, function(err,dashboard){     
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            if(dashboard)
            {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
               // console.log(dashboard);
                var next = true;
                for (var i = 0; i < dashboard.length; i++) {
                    var counter = 1; var imagecounter = 0;
                    next = true;
                    //dashboard[i] = dashboard[i].toJSON();
                    dashboard[i].images = [];
                    while (next) {
                        var file = dashboard[i].propertyname + '_photo' + counter + '.jpg';
                
                        var fileLocation = path.join(__dirname, '/../uploads', file);
                        var img; var base64img;
                        try {
                            img = fs.readFileSync(fileLocation);
                            base64img = new Buffer(img).toString('base64');
                            dashboard[i].images[imagecounter] = base64img;
                            imagecounter++;
                            counter++;
                        }
                        catch(error)
                       {
                            next = false;
                       }
                    }
                }
                console.log("Dashboard Displayed");
                 res.end(JSON.stringify(dashboard));
               
            
            }
         
        }  
    });

 /*properties.find({ "trips_bookings.traveler": req.params.username }, function (err, result) {
        if(err)
            console.log(err);
        else if (result)
            console.log(result);
    })*/
/*
    properties.aggregate([
        { "$match": {
                 "trips_bookings": { "$exists": true, "$ne": [] }
                 }
        },
             
           {"$project" : {
              trips_bookings: {
                 $filter: {
                    input: "$trips_bookings",
                    as: "trips",
                    cond: { $eq: [ "$$trips.traveler", req.params.username ] }
                 }
              },
              "name" : "$name"
           }
        }
     ], function(err, result)
    {
        if(err)
            console.log(err);
        else if (result)
        
            console.log(JSON.stringify(result));
            res.end(JSON.stringify(result));
    })*/
    // var tripsquery = "select propertyname,location,arrive,depart,guests, cost_income from trips_booking where username =  " + mysql.escape(req.params.username);
    // console.log("Get Traveler Trips Query: ", tripsquery);
    // pool.getConnection(function (err, con) {
    //     if (err) {
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Could Not Get Connection Object");
    //     } else {

    //         con.query(tripsquery, function (err, result) {
    //             if (err) { throw err; }
    //             //  con.release();

    //             var next = true;
    //             for (var i = 0; i < result.length; i++) {
    //                 var counter = 1; var imagecounter = 0;
    //                 next = true;
    //                 result[i].images = [];
    //                 while (next) {
    //                     var file = result[i].propertyname + '_photo' + counter + '.jpg';
    //                     console.log(file);
    //                     var fileLocation = path.join(__dirname + '/uploads', file);
    //                     var img; var base64img;
    //                     try {
    //                         img = fs.readFileSync(fileLocation);
    //                         base64img = new Buffer(img).toString('base64');
    //                         result[i].images[imagecounter] = base64img;
    //                         imagecounter++;
    //                         counter++;
    //                     }
    //                     catch
    //                     {
    //                         next = false;
    //                     }
    //                 }
    //             }
    //             console.log("Returning Traveler Trips");
    //             res.end(JSON.stringify(result));
    //         });
    //    }
  //  })
    /*
    for (var i = 0; i < result.length; i++) {
        var file = result[i].propertyname + '_photo1.jpg';
        var fileLocation = path.join(__dirname + '/uploads', file);
        var img = fs.readFileSync(fileLocation);
        var base64img = new Buffer(img).toString('base64');
        result[i].image = base64img;
        /*var file = printproperties[i].propertyname +'.jpg';
            var fileLocation = path.join(__dirname + '/uploads', file);
            var img = fs.readFileSync(fileLocation);
            var base64img = new Buffer(img).toString('base64');
       // res.writeHead(200, { 'Content-Type': 'image/jpg' });
   //    printproperties.push
   // res.end(base64img);
   printproperties[i].image = base64img;*/
    //}

    //  res.end(JSON.stringify(result));
    //});

})

    
module.exports =  router;