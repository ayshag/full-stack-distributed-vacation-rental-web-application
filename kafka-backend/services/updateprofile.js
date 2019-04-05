
var { mongoose } = require('../db/mongoose');
var { users } = require('../models/user');


var bcrypt = require('bcrypt-nodejs');

function handle_request(msg, callback){

    console.log("Inside updateprofile kafka backend");
    console.log("Profile Information: ", msg);
    users.updateOne({ username: msg.email }, { $set: { "name": msg.name, "phone": msg.phone, "aboutme": msg.aboutme, "city": msg.city, "country": msg.country, "school": msg.school, "hometown": msg.hometown, "languages": msg.languages, "gender": msg.gender } }, function (err, response) {

        if (err) {
            console.log(err);
            
        }
        else if (response) {
            console.log("Profile Updated");
            callback(null, true);
        }
        else {
           
            callback(null, false);
           
        }
     
    })
   

}

    exports.handle_request = handle_request;