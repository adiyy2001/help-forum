"use strict";

require('./views/db/mongoose');

var userRouter = require('./routers/user');

var expressValidator = require('express-validator');

var bodyParser = require('body-parser');

var express = require('express');

var flash = require('connect-flash');

var app = express();
var port = process.env.PORT || 3000;
app.set('view engine', 'pug');
app.use(express["static"]("".concat(__dirname, "/public")));
app.use(flash());
app.use(bodyParser.urlencoded({
  extended: true
})); // valid config

app.use(expressValidator({
  errorFormatter: function errorFormatter(param, msg, value) {
    var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));
app.use(express.json());
app.use(userRouter);
app.get('/', function (req, res) {
  res.render('index');
});
app.listen(port, function () {
  return console.log("Server is up on port: ".concat(port));
});