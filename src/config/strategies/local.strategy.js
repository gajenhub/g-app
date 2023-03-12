const passport = require('passport');
const { Strategy } = require('passport-local');
//const LocalStrategy = require('passport-local').Strategy;
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:localStrategy');

module.exports = function localStrategy() {
    passport.use(
        new Strategy(
            {
                usernameField: 'username',
                passwordField: 'password'
            }, (username, password, done) => {

                //const user = { username, password, name: 'Jonathan' }
                //done(null, user);
                const uri = process.env.LOCAL_ACCESS_MONGODB_URI || process.env.HEROKU_MONGODB_URI;
                (async function validateUser() {
                    let client;
                    try {
                        client = await MongoClient.connect(uri);
                        debug('Connected to the mongo DB');
                        const db = client.db("mydb");
                        const user = await db.collection('users').findOne({ username });
                        if (user && user.password === password) {
                            done(null, user);
                        } else {

                            done(null, false);
                        }
                    } catch (error) {
                        done(error, false);
                    }
                }())
            }));
};


