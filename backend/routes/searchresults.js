var kafka = require('../kafka/client');

var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
var passport = require('passport');
router.use(passport.initialize());
require('../config/passport')(passport);
var requireAuth = passport.authenticate('jwt', {session: false});


var inputlocation, inputguests, inputarrive, inputdepart;
//SearchResults Query Post Request
router.post('/query', function (req, res) {
    console.log("Inside Post Home");
    inputlocation = req.body.destination; inputguests = req.body.guests; inputarrive = req.body.arrive; inputdepart = req.body.depart;
    res.end();

});

//Search Results Get Request
router.get('/',/*requireAuth,*/ function (req, res) {
    console.log("Getting Search Results");
    var searchresultslist = [];

    const data = {
        location : inputlocation,
        guests : inputguests,
        arrive : inputarrive,
        depart : inputdepart
    }

    kafka.make_request('searchresults',data, function(err,searchResults){
        
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }  
        else if(searchResults.length!=0)
        {
                
            for (var i = 0; i < searchResults.length; i++) {
                   
                var counter = 1; var imagecounter = 0;
                next = true;
                //esult[i] = result[i].toJSON();
                searchResults[i].images = [];

                while (next) {
                    var file = searchResults[i].name + '_photo' + counter + '.jpg';

                    var fileLocation = path.join(__dirname, '/../uploads', file);
                    var img; var base64img;
                    try {
                        img = fs.readFileSync(fileLocation);
                        base64img = new Buffer(img).toString('base64');
                        searchResults[i].images[imagecounter] = base64img;

                        imagecounter++;
                        counter++;

                    }
                    catch(error)
                    {
                        next = false;
                    }

                }

            }

  
            res.end(JSON.stringify(searchResults));
        }
        else
        {
            console.log("No properties exist that user can book ");
            res.end();
        }
    }
)
    
})



module.exports =  router;
/*
var propname = ""; var arrive = ""; var depart = ""; var guests = "";

app.post('/', function (req, res) {
    console.log("Post SearchResults");
    propname = req.body.name;
    arrive = req.body.arrive;
    depart = req.body.depart;
    guests = req.body.guests;
    //    console.log("hidden : ", req.body.hidden);
    res.end();
}
)

*/