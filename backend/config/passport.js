'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('./settings');
var { mongoose } = require('../db/mongoose');
var { users } = require('../models/user');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    console.log("Inside Passport");
    var opts = {
       
        secretOrKey: config.secret,
        jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt')
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {

       if(jwt_payload)
       {
        callback(null, jwt_payload);
       }
       else{
        callback(null,false);
       }

        
    }));
};


