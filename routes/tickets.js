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
router.post('/', (req, res) => Ticket.findAll({
        where: {
            id: req.body.id
        }
    })  
    .then(ticket => {
        // console.log(ticket)
        res.json(ticket)
    })
    .catch(err => console.log(err))
);

    
// Add a ticket
router.post('/create', (req, res) => {
    // console.log(req.body)

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


// router.post('/add', (req, res) => {
// console.log(req.body)
// });
    
    
module.exports = router;