var mongoose = require('mongoose');

var users = mongoose.model('users',{
    username :{
        type : String
    },
    password : {
        type : String
    },
    phone :{
        type : Number
    },
    name : {
        type : String
    },
    aboutme : {
        type : String
    },
    city : {
        type : String
    },
    country : {
        type : String
    },
    school : {
        type : String
    },
    hometown : {
        type : String
    },
    languages : {
        type : String
    },
    gender : {
        type : String
    },
    propowner : {
        type : Boolean
    }
});

module.exports = {users};