var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost:27017/lab2ha');


mongoose.connect('mongodb://admin:admin1@ds149593.mlab.com:49593/lab2ha', function(err, db) {

  } );

module.exports = {mongoose};