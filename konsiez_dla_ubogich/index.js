const userRouter = require('./routers/user');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(userRouter);

app.listen(port, () => console.log(`Server is up on port: ${port}`) ); 