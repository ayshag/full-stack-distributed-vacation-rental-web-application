
var { mongoose } = require('../db/mongoose');
var { messages } = require('../models/message');


function handle_request(msg, callback){

    console.log("Inside sendmessage kafka backend");
    console.log("Message Information: ", msg);
    var message = new messages({
        sender: msg.sender,
        receiver: msg.receiver,
        message : msg.message

    });

    message.save().then(() => {
        console.log("Message Sent From ", msg.sender, " to ", msg.receiver);
        callback(null, true);
      
    }, (err) => {
        console.log(err);

        
    })

}

    exports.handle_request = handle_request;