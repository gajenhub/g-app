const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');   //logs web traffic
require('dotenv').config();
const path = require('path');
const sessions = require('./src/data/sessions.json');



const port = process.env.PORT || 3000;

const app = express();
const sessionsRouter = express.Router();

sessionsRouter.route('/').get((req, res) => {
    //res.send('hello from sessions');
    res.render('sessions', {
        sessions,
        // sessions: [
        //     { title: 'Session 1', description: 'Sessions 1 description' },
        //     { title: 'Session 2', description: 'Sessions 2 description' },
        //     { title: 'Session 3', description: 'Sessions 3 description' },
        //     { title: 'Session 4', description: 'Sessions 4 description' }
        // ]
    })
});
sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id;
    //res.send(`hello from single session ${id}`);
    res.render('session', {
        session: sessions[id],
    });
});


app.use(morgan('tiny'));
//app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/sessions', sessionsRouter);    //sessions --> sessionRouter (contains all code to deal with sessions route)
app.get('/sessions/sessionID');


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