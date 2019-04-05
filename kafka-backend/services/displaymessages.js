var { mongoose } = require('../db/mongoose');
var { messages } = require('../models/message');


function handle_request(msg, callback){
    console.log("Inside Inbox kafka backend");
    console.log("Inbox Information: ", msg);

   

    messages.find({ receiver: msg.user}, function (err, result) {
        if (err) {
            console.log(err);
                      
        } else {
            console.log("Messages: ",result);
            callback(null, result);
        }
    })
}

exports.handle_request = handle_request;

