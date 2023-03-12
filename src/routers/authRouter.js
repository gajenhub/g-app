const express = require('express');
const debug = require('debug')('app:authRouter');
const { MongoClient, ObjectId } = require('mongodb');
const passport = require('passport');
const { isAuthenticated } = require('../config/passport');
const authRouter = express.Router();

authRouter.route('/signup').get((req, res) => {
    res.render('signup');
})
    .post((req, res) => {
        const { username, password } = req.body;
        const uri = process.env.LOCAL_ACCESS_MONGODB_URI || process.env.HEROKU_MONGODB_URI;

        (async function addUser() {
            const { username, password } = req.body;
            let client;
            try {
                client = await MongoClient.connect(uri);

                const db = client.db("mydb");
                const user = { username, password };
                const results = await db.collection('users').insertOne(user);
                debug(results);


                const db_user = await db.collection('users').findOne(
                    { _id: new ObjectId(results.insertedId.toString()) });

                console.log(db_user);
                // res.render('users', {
                //     db_user,
                // });



                //const id = results.insertedId.toString();
                //const result = await db.collection.findOne({ _id: id });
                //const result = await db.collection.find({ _id: { $in: Object.values(results.insertedId) } }).toArray();
                //console.log(result);


                req.login(db_user, () => {
                    res.redirect('/auth/profile');
                })

            } catch (error) {
                debug(error);
            }
            client.close();
        }());
    })
    ;

authRouter
    .route('/signin')
    .get((req, res) => {
        const message = "Sign In";
        res.render('signin', { message });
    })
    .post(
        passport.authenticate('local', {
            successRedirect: '/auth/profile',
            //failureMessage: '/',
            failureRedirect: '/auth/unauthorized'
        })
    );

authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
});

authRouter.route('/unauthorized').get((req, res) => {
    const message = 'Invalid username/password.';
    res.render('signin', { message });
});

authRouter.route('/logout').get((req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Error logging out:', err);
            return next(err);
        }
        res.send("logged out");
        //res.redirect('/login');
    });
});


module.exports = authRouter;
