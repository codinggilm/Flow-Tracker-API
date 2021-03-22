const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Ticket = require('../models/Ticket'); 
// const Comment = require('../models/Comment');
 

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
        res.json(ticket)
    })
    .catch(err => console.log(err))
);

    
// Add a ticket
router.post('/create', (req, res) => {

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
    .then(console.log(req.body))
    .then(console.log('added a new ticket successfully'))
    // .then(res.json('added a new ticket successfully'))
    .catch(err => console.log(err))
});


// MANUAL CREATION *********************

router.get('/create', (req, res) => {

    const data = {
        title: "Not wowking",
        description: "Go broke stay woke",
        developer: "Risoto",
        priority: "High",
        status: "Open",
        type: "Bug",
        submitter: "Plum" 
    }

    let {title, description, developer, priority, status, type, submitter } = data;

    Ticket.create({
        title,
        description,
        developer,
        priority,
        status,
        type,
        submitter,
    })

    .then(ticket => res.json(ticket))
    // .then(console.log(req.body))
    // .then(res.json('added a new ticket successfully'))
    .catch(err => console.log(err))
});


// Add a ticket with a comment
router.post('/createWithComment', (req, res) => {

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
    .then(ticket => Comment.create({
        user: 'Jerry',
        role: 'Admin',
        content: ticket.comment,
        ticketId: ticket.id,
        projectId: ticket.projectId,
        project: ticket.project

    }))
    .then(console.log(req.body))
    .then(ticket => console.log(ticket.id))
    .then(console.log('added a new ticket and comment successfully'))
    .catch(err => console.log(err))
});


// Update a ticket

router.put('/', (req, res) => Ticket.update(
        {
            title: req.body.data.title,
            description: req.body.data.description,
            project: req.body.data.project,
            projectId: req.body.data.projectId,
            developer: req.body.data.developer,
            priority: req.body.data.priority,
            status: req.body.data.status,
            type: req.body.data.type
        }, 
        {
            where: {
                id: req.body.id 
            }
        }
    )
    .then(console.log(req.body.data))
    .then(res.json('updated ticket successfully'))
    .catch(err => console.log(err)) 
)

// Delete a ticket
router.post('/delete', (req, res) => Ticket.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(console.log(req.body.data))
    .then(res.json(console.log('ticket has been successfully deleted')))
    .catch(err => console.log(err))
)

    
    
module.exports = router;