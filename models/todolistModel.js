'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var TodolistSchema = new Schema({
        user_id    : { 
            type: String,
            trim: true
        },
        content    : { 
            type: String,
            trim: true
        },
    }, { timestamps: true });

module.exports = mongoose.model('Todolist', TodolistSchema);
