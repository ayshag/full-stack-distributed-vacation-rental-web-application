
var { mongoose } = require('../db/mongoose');
var { properties } = require('../models/property');
//var { trip_booking } = require('./models/trips_bookings');

var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){

    console.log("Inside postproperty kafka backend");
    console.log("Property Information: ", msg);
    properties.findOne({ name: msg.name }, function (err, result) {
        if (err) {
            console.log(err);
            res.end();
        }
        else if (result) {
            console.log("Property with same name already exists");
            callback(null, false);
        }
        else {
            var property = new properties({
                location: msg.location,
                name: msg.name,
                sleeps: msg.sleeps,
                type: msg.type,
                bedrooms: msg.bedrooms,
                bathrooms: msg.bathrooms,
                price: msg.price,
                amenities: msg.amenities,
                owner: msg.owner,
                availableend: msg.availableend,
                availablestart: msg.availablestart
            });

            property.save().then(() => {
                console.log("Property Successfully Added");
               callback(null, true);
            }, (error) => {
                console.log(error);
               // res.end();
            })
           
        }
     
    })
   

}

    exports.handle_request = handle_request;