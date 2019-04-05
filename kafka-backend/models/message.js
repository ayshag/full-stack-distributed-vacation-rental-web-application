var mongoose = require('mongoose');

var messages = mongoose.model('messages',{
    sender :{
        type : String
    },
    receiver : {
        type : String
    },
    message : {
        type : String
    }
  
});

module.exports = {messages};