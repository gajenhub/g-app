const express = require('express');
//const sessions = require('./src/data/sessions.json');
const sessions = require('../data/sessions.json');
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

module.exports = sessionsRouter;

