const express = require('express');
const chalk = require('chalk');
//allow us to set some color on our messages..so we can group them together

require('dotenv').config();
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public/')));


app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(port, () => {
    console.log(`listening to port ${chalk.green(port)}`);
})
