const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Ticket = require('../models/Ticket'); 
const Comment = require('../models/Comment');
const TicketHistory = require('../models/TicketHistory');
 

// Fetch all tickets
router.get('/', (req, res) => Ticket.findAll()
    .then(tickets => {
        // console.log(tickets)
        res.json(tickets)
    })
    .catch(err => console.log(err))
);
 

// Fetch one ticket  *************************************************
// router.post('/', (req, res) => Ticket.findAll({
router.get('/:id', (req, res) => Ticket.findAll({
        where: {
            id: req.params.id
        }
    })  
    .then(ticket => {
        res.json(ticket)
    })
    .catch(err => console.log(err))
);

    
// Create a ticket  *******************************************************
router.post('/create', (req, res) => {

    Ticket.create({
        title: req.body.title,
        description: req.body.description,
        project: req.body.project,
        projectId: req.body.projectId,
        developer: req.body.developer,
        developerId: req.body.developerId,
        priority: req.body.priority,
        status: req.body.status,
        type: req.body.type,
        submitter: req.body.submitter
    })
    // .then(console.log(req.body))
    .then(console.log('added a new ticket successfully'))
    .then(ticket => res.json(ticket)) 
    // .then(ticket => res.json(ticket))
    // .then(res.redirect('/tickets'))
    // .then(res.json('added a new ticket successfully'))
    .catch(err => console.log(err))
});


// Create a ticket with a comment  ****************************************************
router.post('/createWithComment', (req, res) => {

    Ticket.create({
        title: req.body.title,
        description: req.body.description,
        project: req.body.project,
        projectId: req.body.projectId,
        developer: req.body.developer,
        developerId: req.body.developerId,
        priority: req.body.priority,
        status: req.body.status,
        type: req.body.type,
        submitter: req.body.submitter
    })
    .then(ticket => Comment.create({
        user: 'Jerry',
        userId: 1,
        role: 'Admin',
        content: req.body.comment,
        ticketId: ticket.id,
        projectId: ticket.projectId,
        project: ticket.project

    }))
    .then(console.log(req.body))
    .then(ticket => res.json(ticket))
    .then(console.log('added a new ticket and comment successfully'))
    // .then(res.json('/tickets'))
    .catch(err => console.log(err))
});

// Update a ticket **************************************************

// router.put('/', (req, res) => {
router.put('/update/:id', (req, res) => Ticket.update(
        {
            title: req.body.title,
            description: req.body.description,
            project: req.body.project,
            projectId: req.body.projectId,
            developer: req.body.developer,
            developerId: req.body.developerId,
            priority: req.body.priority,
            status: req.body.status,
            type: req.body.type
        }, 
        {
            where: { id: req.params.id }
        }
    ) 
    .then(ticket => res.json(ticket))
    .then(console.log('updated ticket successfully'))
    .catch(err => console.log(err)) 
)


// Save Ticket History *******************************************************************

router.post('/save-history/:id', (req, res) => TicketHistory.create(
    {
        property: req.body.property,
        oldValue: req.body.oldValue,
        newValue: req.body.newValue,
        ticketId: req.params.id
        
    }) 
    .then(history => res.json(history))
    .then(console.log(req.body))
    .then(console.log('saved ticket history successfully'))
    .catch(err => console.log(err)) 
)

// Get Ticket History ********************************************************************

// router.post('/history/:id', (req, res) => TicketHistory.findAll({
router.get('/history/:id', (req, res) => TicketHistory.findAll(
    {
        where: { ticketId: req.params.id }
    })
    .then(console.log(req.body))
    .then(history => res.json(history))
    .catch(err => console.log(err)) 
)


// Delete a ticket  ***********************************************************************
router.post('/delete/:id', (req, res) => Ticket.destroy(
    {
        where: { id: req.params.id } 
    })
    .then(console.log(req.body))
    .then(res.json(console.log('ticket has been successfully deleted')))
    .catch(err => console.log(err))
)

    
    
module.exports = router;