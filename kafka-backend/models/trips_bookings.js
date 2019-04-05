var mongoose = require('mongoose');

var trip_booking = mongoose.model('trips_bookings',{
    owner :{
        type : String
    },
    traveler : {
        type : String
    },
    propertyname :{
        type : String
    },
    location : {
        type : String
    },
    arrive : {
        type : Date
    },
    depart : {
        type : Date
    },
    guests : {
        type : Number
    },
    cost_income : {
        type : Number
    },
    amenities : {
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

module.exports = {trip_booking};