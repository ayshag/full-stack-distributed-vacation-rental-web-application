var { mongoose } = require('../db/mongoose');
var { users } = require('../models/user');
//var { properties } = require('./models/property');
//var { trip_booking } = require('./models/trips_bookings');
//var { mongoose } = require('./db/mongoose');
var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){

    console.log("Inside login kafka backend");
    console.log("Username: ", msg.username ," Password: ", msg.password);

    var validated = null;

    users.findOne({username: msg.username}, function (err, user) {
        console.log("Finding User");
        if (err) {
            console.log("Error: ", err);
        } else if (user) {
            bcrypt.compare(msg.password, user.password, function (err, resp) {
                console.log("Response: ",resp);
                if (resp) {
                    validated = true;
                } else {
                    validated = false;
                }
                if (validated) {
                        console.log("User Validated");
                        callback(null, true);
                         console.log("after callback");    
                }
                else 
                {
                    console.log("Invalid Information");
                    callback(null, false);
                   
                }
            })
        }
        else{
            console.log("Username Does Not Exist");
           callback(null, false);
        }
    })

}

    exports.handle_request = handle_request;