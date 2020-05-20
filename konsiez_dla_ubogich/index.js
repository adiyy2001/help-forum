require('./views/db/mongoose');
const userRouter = require('./routers/user');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const express = require('express');
const flash = require('connect-flash');


const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true })); 

// valid config
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

app.use(express.json());
app.use(userRouter);

app.get('/', (req,res) => {
    res.render('index');
})

app.listen(port, () => console.log(`Server is up on port: ${port}`) ); 