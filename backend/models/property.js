var mongoose = require('mongoose');

var properties = mongoose.model('properties',{
    location :{
        type : String
    },
    name : {
        type : String
    },
    sleeps : {
        type : Number
    },
    type : {
        type : String
    },
    bedrooms : {
        type : Number
    },
    bathrooms : {
        type : Number
    },
    price : {
        type : Number
    },
    amenities : {
        type : String
    },
    owner : {
        type : String
    },
    availablestart : {
        type : Date
    },
    availableend : 
    {
        type : Date
    }
  
});

module.exports = {properties};