var { mongoose } = require('../db/mongoose');
var { users } = require('../models/user');
//var { properties } = require('./models/property');
//var { trip_booking } = require('./models/trips_bookings');

var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){

    console.log("Inside owner signup kafka backend");
    console.log("Name: ", msg.name, " Phone: ", msg.phone, " Username: ", msg.username ," Password: ", msg.password);

   
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

                var owner = new users({
                    username: msg.username,
                    password: hashedpassword,
                    name: msg.name,
                    phone: msg.phone,
                    propowner: true

                });

                owner.save().then(() => {
                    console.log("Owner Account Created");
                    callback(null, true);
                  
                }, (err) => {
                    console.log(err);

                    
                })
            });

        }
    })

   
    

}

    exports.handle_request = handle_request;