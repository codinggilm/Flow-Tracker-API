const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Ticket = require('../models/Ticket');


// Get list of all tickets
router.get('/', (req, res) => Ticket.findAll()
    .then(tickets => {
        // console.log(tickets)
        res.json(tickets)
    })
    .catch(err => console.log(err))
);


// Fetch specific ticket

    
// Add a ticket
router.post('/', (req, res) => {
    // let { title, description } = data;

    Ticket.create({
        title: req.body.title,
        description: req.body.description,
        project: req.body.project,
        projectId: req.body.projectId,
        developer: req.body.developer,
        priority: req.body.priority,
        status: req.body.status,
        type: req.body.type,
        submitter: req.body.submitter,
        comment: req.body.comment
    })
    // .then(project => res.redirect('/tickets'))
    .then(res.json('added a new ticket successfully'))
    .catch(err => console.log(err))
});


router.post('/add', (req, res) => {
console.log(req.body)
});
    
    
module.exports = router;