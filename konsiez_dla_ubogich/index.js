require('./views/db/mongoose');
const userRouter = require('./routers/user');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))

app.use(session({
  secret: 'fds$#Fdsq',
  resave: true,
  saveUninitialized: true
}))

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// valid config
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

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

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRouter)

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(port, () => console.log(`Server is up on port: ${port}`)); 