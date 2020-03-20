'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({

    
    fullName: { 
        type: String,
        trim: true
    },

    email: { 
        type: String,
        trim: true,
        required: true
    },

    password: { 
        type: String,
        required: true
    }   

}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);
