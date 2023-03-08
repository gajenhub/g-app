const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectId } = require('mongodb');

const sessionsRouter = express.Router();

sessionsRouter.route('/').get((req, res) => {
    const uri = process.env.LOCAL_ACCESS_MONGODB_URI || process.env.HEROKU_MONGODB_URI;

    (async function mongo() {
        let client;
        try {

            client = await MongoClient.connect(uri);
            debug('Connected to the mongo DB');

            const db = client.db("mydb");
            const sessions = await db.collection('sessions').find().toArray();
            res.render('sessions', { sessions })

        } catch (error) {
            console.log(error.stack);
        }

    }());

});

sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id;

    const uri = process.env.LOCAL_ACCESS_MONGODB_URI || process.env.HEROKU_MONGODB_URI;

    (async function mongo() {
        let client;
        try {

            client = await MongoClient.connect(uri);
            debug('Connected to the mongo DB');
            const db = client.db("mydb");
            const session = await db.collection('sessions').findOne(
                { _id: new ObjectId(id) });

            res.render('session', {
                session,
            });

        } catch (error) {
            console.log(error.stack);
        }

    }());
});

module.exports = sessionsRouter;