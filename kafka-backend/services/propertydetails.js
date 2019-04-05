
var { mongoose } = require('../db/mongoose');
var { properties } = require('../models/property');


function handle_request(msg, callback){
    console.log("Inside getpropertydetails kafka backend");
    console.log("Property Information: ", msg);


    properties.findOne({ name: msg.propname }, function (err, result) {
        if (err) {
            console.log(err);
        }
        else if (result) {
            result = result.toJSON();
            console.log(result);
            var tripend = msg.depart.split('-');
            var tripenddate = new Date(tripend[0] - 1, tripend[1], tripend[2]);
            var tripstart = msg.arrive.split('-');
            var tripstartdate = new Date(tripstart[0] - 1, tripstart[1], tripstart[2]);

            var days = Math.round((tripenddate - tripstartdate) / (1000 * 60 * 60 * 24)) + 1;
            var cost = days * result.price * msg.guests;
    
            result.totalcost = cost;           
            console.log(result);
            callback(null, result);
        }
})
}

exports.handle_request = handle_request;