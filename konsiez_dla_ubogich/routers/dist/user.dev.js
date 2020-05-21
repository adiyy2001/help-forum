"use strict";

var express = require('express');

var router = new express.Router();

var User = require('../models/user');

router.get('/users/register', function (req, res) {
  res.render('register');
});
router.post('/users/register', function _callee(req, res) {
  var user, errors;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = new User(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(user.save());

        case 4:
          res.status(201).redirect('/users/login');
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          errors = _context.t0.message.substring(23, _context.t0.message.length).split(",").map(function (x) {
            return x.substring(x.indexOf(':') + 1, x.length);
          });
          res.render('register', {
            errors: errors
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
router.get('/users/login', function (req, res) {
  res.render('login');
});
module.exports = router;