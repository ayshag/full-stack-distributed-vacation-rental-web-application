
var { mongoose } = require('../db/mongoose');
var { properties } = require('../models/property');
var { trip_booking } = require('../models/trips_bookings');

function handle_request(msg, callback){
    console.log("Inside getpropertydetails kafka backend");
    console.log("Property Information: ", msg);

   
    trip_booking.find({traveler: msg.username}, function(error, result)
    {
        if(error)
            console.log(error);
        else if (result)
          {        
            console.log(result);
            callback(null, result);
        }
})
}

exports.handle_request = handle_request;