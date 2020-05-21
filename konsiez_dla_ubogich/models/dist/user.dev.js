"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: function validate(value) {
      if (value.length < 3) throw new Error('Imie jest za krótkie');
    }
  },
  surname: {
    type: String,
    required: true,
    trim: true,
    validate: function validate(value) {
      if (value.length < 3) throw new Error('Nazwisko jest za krótkie');
    }
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
    unique: true,
    validate: function validate(value) {
      if (!validator.isEmail(value)) throw new Error('niepoprawny adres email');
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: function validate(value) {
      if (value.length < 6) throw new Error('Hasło musi mieć conajmniej 6 znaków');
    }
  },
  password2: {
    type: String,
    required: true,
    trim: true,
    validate: function validate(value) {
      if (!validator.equals(value, this.password)) throw new Error('Hasła nie są identyczne');
    }
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
userSchema.pre('save', function _callee(next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = this;

          if (!user.isModified('password')) {
            _context.next = 5;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, 8));

        case 4:
          user.password = _context.sent;

        case 5:
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});
var User = module.exports = mongoose.model('User', userSchema);