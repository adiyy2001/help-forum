require('./views/db/mongoose');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');

const cookieSession = require('cookie-session');
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

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: ['ewqdasd']
}))

app.use(session({
  secret: 'fds$#Fdsq',
  resave: false,
  saveUninitialized: false
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
app.use('/posts', postRouter)

app.get('/', (req, res) => {
  const _id = req.session.passport['user'];
  if(_id) res.render('index', { _id });
})

app.get('/forum', (req, res) => {
  const _id = req.session.passport['user'];
  if(_id) {
    res.render('forum', {_id});
  }
})


app.listen(port, () => console.log(`Server is up on port: ${port}`)); 