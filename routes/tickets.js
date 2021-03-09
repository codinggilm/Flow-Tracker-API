const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Ticket = require('../models/Ticket');


// Get list of all tickets
router.get('/', (req, res) => Ticket.findAll()
    .then(tickets => {
        console.log(tickets)
        res.sendStatus(200)
    })
    .catch(err => console.log(err))
);

    
// Add a project
router.get('/add', (req, res) => {
    const data = {
        title: 'My first ticket',
        description: 'this is a test ticket',
        project: 'project 1',
        developer: 'Kirk Hammet',
        priority: 'low',
        status: 'open',
        type: 'bug',
        submitter: 'Cliff Burton',
        comment: 'this should work',
    }

    // let { title, description } = data;

    Ticket.create({
        title: data.title,
        description: data.description,
        project: data.project,
        developer: data.developer,
        priority: data.priority,
        status: data.status,
        type: data.type,
        submitter: data.submitter,
        comment: data.comment
    })
    .then(project => res.redirect('/tickets'))
    .catch(err => console.log(err))
});
    
    
module.exports = router;