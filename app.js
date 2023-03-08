const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');   //logs web traffic
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();
const sessionsRouter = require('./src/routers/sessionsRouter');
const adminRouter = require('./src/routers/adminRouter');
const signupRouter = require('./src/routers/signupRouter');
const authRouter = require('./src/routers/authRouter');


app.use(morgan('tiny'));
//app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/sessions', sessionsRouter);    //sessions --> sessionRouter (contains all code to deal with sessions route)
app.use('/admin', adminRouter);
app.use('/signup', signupRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
    //res.send('Hello, World!');
    res.render('index', {
        title: '', data: ['New York', 'Chicago', 'Boston', 'Los Angeles']
    });
})

app.listen(port, () => {
    debug(`Listening to port ${chalk.green(port)}`);
})






/*
chalk:
//allow us to set some color on our messages..so we can group them together

morgan:
//app.use(morgan('combined'));      //gives lot of info about page
//changed settings to tiny for less information

app.use:
//allows to set variables inside the context of our application
//setting a variable called 'views' and telling where the views are src/views

//app.set:
//setting view engine name
//expess app looking in src/views for templates associated with EJS. 


//console.log(`listening to port ${chalk.green(port)}`);
//only runs in debug mode, in production doesnot print in console.
//$DEBUG=* node app.js
//logs web traffic

using following code will override view engine ejs and take index page from public folder.
//app.use(express.static(path.join(__dirname, '/public/')));



*/