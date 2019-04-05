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
    },
    trips_bookings: [
        {
            
           arrive: {type:  Date}  ,
            depart: {type: Date} ,
            traveler: {type: String},
            cost_income: {type: Number }
          //type : Array , "default" : [] 
        }
    ]

  
});

module.exports = {properties};