var kafka = require('../kafka/client');

var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});




var propname = ""; var arrive = ""; var depart = ""; var guests = "";

router.post('/query',/*requireAuth,*/ function (req, res) {
    console.log("Post SearchResults");
    propname = req.body.name;
    arrive = req.body.arrive;
    depart = req.body.depart;
    guests = req.body.guests;
    //    console.log("hidden : ", req.body.hidden);
    res.end();
}
)
    
   
router.get('/', function (req, res) {
    console.log("Getting details for property ", propname);
    const data  = {
        propname : propname,
        arrive : arrive,
        depart : depart,
        guests : guests
    }

     kafka.make_request('propertydetails',data, function(err,propertydetails){
    
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }
        else if(propertydetails) {
            console.log(propertydetails);

            var counter = 1; var imagecounter = 0;
            next = true;
            propertydetails.images = [];
            while (next) {
                var file = propertydetails.name + '_photo' + counter + '.jpg';
                
                var fileLocation = path.join(__dirname, '/../uploads', file);
                var img; var base64img;
                try {
                    img = fs.readFileSync(fileLocation);
                    base64img = new Buffer(img).toString('base64');
                    propertydetails.images[imagecounter] = base64img;
                    imagecounter++;
                    counter++;
                }
                catch(error)
                {
                    next = false;
                }
            }
            
            console.log("Returning Property '" + propname + "' Details");
            res.end(JSON.stringify(propertydetails));
        }
    })
})


//Details Post Request  
router.post('/', function (req, res) {
    console.log("Post Details")
    console.log("Booking Property");

    kafka.make_request('bookproperty',req.body, function(err,propertyBooked){
       
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
        
            if(propertyBooked)
            {
                console.log("Property Booked Successfully");
                res.end("Property Booked Successfully");
            
            }
            else{
                res.end();
            }
        }  
    });
})


module.exports =  router;