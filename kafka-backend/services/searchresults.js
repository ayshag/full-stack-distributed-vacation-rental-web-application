

var { mongoose } = require('../db/mongoose');
var { properties } = require('../models/property');


function handle_request(msg, callback){
    console.log("Inside searchresults kafka backend");
    console.log("Search Information: ", msg);

    properties.find({ location: msg.location, sleeps: msg.guests, availablestart: { $lt: msg.arrive }, availableend: { $gt: msg.depart } }, function (err, result) {
        if (err) {
            console.log(err);
                      
        } else {
            console.log(result);
            callback(null, result);
        }
    })
}

exports.handle_request = handle_request;

