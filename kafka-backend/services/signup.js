var { mongoose } = require('../db/mongoose');
var { users } = require('../models/user');
//var { properties } = require('./models/property');
//var { trip_booking } = require('./models/trips_bookings');
//var { mongoose } = require('./db/mongoose');
var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){

    console.log("Inside signup kafka backend");
    console.log("Name: ", msg.name, " Username: ", msg.username ," Password: ", msg.password);

    var validated = null;
    var hashedpassword = "";

    users.findOne({ username: msg.username }, function (error, result) {
        if (error) {
            console.log(error);
        }
        else if (result) {
            console.log("Username already exists");
            callback(null, false);
        }

        else {
            var hashsalt = bcrypt.genSalt(5, function (err, salt) { return salt; });

            bcrypt.hash(msg.password, hashsalt, null, function (err, hash) {
                hashedpassword = hash;

                var traveler = new users({
                    username: msg.username,
                    password: hashedpassword,
                    name: msg.name
                });

                traveler.save().then(() => {
                    console.log("Account Created");
                    callback(null, true);
                  
                }, (err) => {
                    console.log(err);

                    
                })
            });

        }
    })
   

}

    exports.handle_request = handle_request;