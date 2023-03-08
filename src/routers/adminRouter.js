const express = require('express');
const debug = require('debug')('app:adminRouter');
const mongodb = require('mongodb');
const { MongoClient } = require('mongodb');
const sessions = require('../data/sessions.json');
const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
    const uri = process.env.LOCAL_ACCESS_MONGODB_URI || process.env.HEROKU_MONGODB_URI;

    (async function mongo() {
        let client;
        try {

            client = await MongoClient.connect(uri);
            const db = client.db("mydb");

            //drop the collection if it exists
            try {
                await db.dropCollection("sessions");
                console.log("Sessions collection dropped.");
            } catch (err) {
                if (err.code !== 26) throw err;
            }

            //create collection
            await db.createCollection("sessions");
            console.log("Sessions collection created");

            //insert data
            const result = await db.collection("sessions").insertMany(sessions);
            console.log(`${result.insertedCount} document inserted.`);
            console.log(result.insertedIds);
            console.log(1);

            //const insertIds = result.insertedIds;
            //console.log(insertIds);
            const insertedDocs = await db.collection('sessions').find({ _id: { $in: Object.values(result.insertedIds) } }).toArray();
            console.log(insertedDocs);

            client.close();
            //res.json(result);
            res.json(insertedDocs);
            // MongoDB connection string in a variable called `uri`
            // client = await MongoClient.connect(uri);
            // // Reference to a database and collection objects
            // const db = client.db('mydb');
            // //await collection.drop();
            // const sessionsCollection = db.collection('sessions');
            // //console.log(sessionsCollection);
            // //An array of document to be inserted 'sessions'
            // const result = await sessionsCollection.insertMany(sessions);
            // console.log(result);
            // res.json(result);

        } catch (error) {
            console.log(error.stack);
        }
    }());

});
module.exports = adminRouter;



// adminRouter.route('/').get((req, res) => {
//     const url = process.env.LOCAL_ACCESS_MONGODB_URI;
//     //console.log(url);
//     const dbName = 'g-db';
//     (async function mongo() {
//         let client;
//         try {
//             client = await MongoClient.connect(url);
//             debug('Connected to the mongo DB');
//             const db = client.db(dbName);
//             const response = await db.collection('sessions').insertMany(sessions);
//             res.json(response);

//         } catch (error) {
//             debug(error.stack);
//         }
//     }());
// })



/*
//get the reference to the collection
            //const collection = db.collection('sessions');


            //drop the collection
            //await collection.drop();


            const insertIds = response.insertedIds;
            console.log(insertIds);
            //Query the collection using the inserted _id values
            console.log("START");
            const insertedDocs = await db.collection('sessions').find({ _id: { $in: Object.values(insertedIds) } }).toArray();
            console.log(insertedDocs);
            console.log("END");
*/