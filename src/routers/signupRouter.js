const express = require('express');
const debug = require('debug')('app:signupRouter');


const signupRouter = express.Router();

signupRouter.route('/').get((req, res) => {
    res.render('signup');
});



module.exports = signupRouter;