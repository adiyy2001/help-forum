"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  nick: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  password2: {
    type: String,
    required: true,
    trim: true
  },
  voivodeship: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});
var User = module.exports = mongoose.model('User', userSchema);