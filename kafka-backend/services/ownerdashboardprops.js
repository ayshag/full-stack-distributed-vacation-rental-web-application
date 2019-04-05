
var { mongoose } = require('../db/mongoose');
var { properties } = require('../models/property');


function handle_request(msg, callback){
    console.log("Inside Owner Properties kafka backend");
    console.log("Owner Dashboard Property Information: ", msg);

   
properties.find({
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
