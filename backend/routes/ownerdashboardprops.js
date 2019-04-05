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
    console.log("Getting Properties Owned by Owner");
   
    kafka.make_request('ownerdashboard_props',req.params, function(err,ownerdashboardprops){     
        if (err){
            console.log("Error");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            if(ownerdashboardprops)
            {

                var next = true;
                for (var i = 0; i < ownerdashboardprops.length; i++) {
                    var counter = 1; var imagecounter = 0;
                    next = true;
                    //result[i] = result[i].toJSON();
                    ownerdashboardprops[i].images = [];
                    while (next) {
                        var file = ownerdashboardprops[i].name + '_photo' + counter + '.jpg';
    
                        var fileLocation = path.join(__dirname, '/../uploads', file);
                        var img; var base64img;
                        try {
                            img = fs.readFileSync(fileLocation);
                            base64img = new Buffer(img).toString('base64');
                            ownerdashboardprops[i].images[imagecounter] = base64img;
    
                            imagecounter++;
                            counter++;
                        }
                        catch(error)
                        {
                            next = false;
                        }
                    }
                    //console.log("Result", result[i].images);
                }
             //   console.log(ownerdashboardprops);
                console.log("Returning Owner Properties");
                res.end(JSON.stringify(ownerdashboardprops));
            }
            }
        })


});



module.exports =  router;