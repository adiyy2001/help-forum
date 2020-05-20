"use strict";

var express = require('express');

var router = new express.Router();

var User = require('../models/user');

var bcrypt = require('bcryptjs');

router.get('/users/register', function (req, res) {
  res.render('register');
});
router.post('/users/register', function (req, res) {
  var name = req.body.name;
  var surname = req.body.surname;
  var nick = req.body.nick;
  var email = req.body.email;
  var voivodeship = req.body.voivodeship;
  var city = req.body.city;
  var password = req.body.password;
  var password2 = req.body.password2;
  req.checkBody('name', 'Imie jest wymagane').notEmpty();
  req.checkBody('nick', 'Nick jest wymagane').notEmpty();
  req.checkBody('email', 'Email jest wymagany').notEmpty();
  req.checkBody('email', 'Email jest niepoprawny').isEmail();
  req.checkBody('nick', 'Nick jest wymagany').notEmpty();
  req.checkBody('password', 'Hasło jest wymagany').notEmpty();
  req.checkBody('password2', 'hasła nie są równe').equals(password);
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      var errors = result.array().map(function (elem) {
        return elem.msg;
      });
      console.log('There are following validation errors: ' + errors.join('&&'));
      res.render('register', {
        errors: errors
      });
    } else {
      var newUser = new User({
        name: name,
        surname: surname,
        nick: nick,
        email: email,
        password: password,
        password2: password2,
        voivodeship: voivodeship,
        city: city
      });
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          if (err) console.log(err);
          newUser.password = hash;
          newUser.save(function (err) {
            if (err) console.log(err);else res.redirect('/users/login');
          });
        });
      });
    }
  });
});
router.get('/users/login', function (req, res) {
  res.render('login');
});
module.exports = router;