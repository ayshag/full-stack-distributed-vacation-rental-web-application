
var { mongoose } = require('../db/mongoose');
var { trip_booking } = require('../models/trips_bookings');


function handle_request(msg, callback){
    console.log("Inside Owner Dashboard Bookings kafka backend");
    console.log("Owner Dashboard Bookings Information: ", msg);

   
    trip_booking.find({
    owner: msg.username
}, function (err, result) {

    if (err) {
        console.log(err);
        res.end(err);
    }
    else if(result) {
        console.log("Returning Owner Properties");
        callback(null, result);
    }
}
)}

exports.handle_request = handle_request;
