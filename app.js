const express = require('express');

//allow us to set some color on our messages..so we can group them together
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');   //logs web traffic
require('dotenv').config();
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;


//app.use(morgan('combined'));      //gives lot of info about page
app.use(morgan('tiny'));            //changed settings to tiny for less information

app.use(express.static(path.join(__dirname, '/public/')));
app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(port, () => {
    //console.log(`listening to port ${chalk.green(port)}`);


    debug(`Listening to port ${chalk.green(port)}`);
    //only runs in debug mode, in production doesnot print in console.
    //$DEBUG=* node app.js
    //logs web traffic


})


/*
Note:

e.g. $npm start; $npm test; $npm run debug
nodemon:        watch for changes and restart the app
environment variables priorities:
            -   package.json
            -   .env file
*/