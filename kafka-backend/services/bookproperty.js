
var { mongoose } = require('../db/mongoose');
var { trip_booking } = require('../models/trips_bookings');

var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){

    console.log("Inside bookproperty kafka backend");
    console.log("Booking Information: ", msg);
    
    var trip =  new trip_booking({
        owner : msg.owner,
        traveler : msg.user,
        propertyname : msg.name,
        location : msg.location,
        arrive : msg.arrive,
        depart : msg.depart,
        guests : msg.guests,
        cost_income : msg.totalcost
        
    });


    trip.save().then(() => {
        console.log("Property Booked Successfully");
        callback(null, true);
      
    }, (err) => {
        console.log(err);
        
    })
    
}

    exports.handle_request = handle_request;