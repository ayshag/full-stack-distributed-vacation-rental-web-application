

var { mongoose } = require('../db/mongoose');
var { users } = require('../models/user');

function handle_request(msg, callback){
    console.log("Inside GetUserAccess kafka backend");
    console.log("Kafka Message: ", msg);

users.findOne({
    username: msg.username
}, function (err, user) {
console.log("Found User ", user);
    if (err) {
        console.log(err);
      
    } else  {
        
        if (typeof(user.propowner)=='undefined' || user.propowner == false) {
            console.log("User is not owner");
            callback(null,false);
    
        }
        else if (user.propowner == true) {
            console.log("User is Owner");
            callback(null,true);
        }
    }
}
)
}
exports.handle_request = handle_request;
