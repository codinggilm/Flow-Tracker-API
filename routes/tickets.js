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
    .then(ticket => console.log(ticket))  // THE ONE
    // .then(ticket => res.json(ticket))
    // .then(res.redirect('/tickets'))
    // .then(res.json('added a new ticket successfully'))
    .catch(err => console.log(err))
});


// MANUAL CREATION *********************

// router.get('/create', (req, res) => {

//     const data = {
//         title: "Not wowking",
//         description: "Go broke stay woke",
//         developer: "Risoto",
//         priority: "High",
//         status: "Open",
//         type: "Bug",
//         submitter: "Plum" 
//     }

//     let {title, description, developer, priority, status, type, submitter } = data;

//     Ticket.create({
//         title,
//         description,
//         developer,
//         priority,
//         status,
//         type,
//         submitter,
//     })

//     .then(ticket => res.json(ticket))
//     // .then(console.log(req.body))
//     // .then(res.json('added a new ticket successfully'))
//     .catch(err => console.log(err))
// });


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

router.put('/', (req, res) => {

    Ticket.update(
        {
            title: req.body.data.title,
            description: req.body.data.description,
            project: req.body.data.project,
            projectId: req.body.data.projectId,
            developer: req.body.data.developer,
            developerId: req.body.data.developerId,
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
    // .then(ticket => console.log(ticket[0].dataValues))
    // .then(newticket => console.log(newticket))  // THE ONE
    // .then(ticket => {
    //     console.log(Object.assign({ticket}, ticket))
    // })  
    .then(ticket => res.json(ticket))
    // .then(res.json('updated ticket successfully'))
    .catch(err => console.log(err)) 
    }
)


// Save Ticket History *******************************************************************

router.post('/save-history', (req, res) => {
    console.log(req.body);
    
    // TicketHistory.create(
    //     {
    //         property: req.body.property,
    //         oldValue: req.body.oldValue,
    //         newValue: req.body.newValue,
    //         ticketId: req.body.ticketId
            
    //     }
    // ) 
    // // .then(ticket => console.log(ticket[0].dataValues))
    // // .then(newticket => console.log(newticket))  // THE ONE
    // .then(ticket => res.json(ticket))
    // .then(res.json('saved ticket history successfully'))
    // .catch(err => console.log(err)) 
    }
)

// Delete a ticket  ***********************************************************************
router.post('/delete', (req, res) => Ticket.destroy({
        where: {
            id: req.body.id
        } 
    })
    .then(console.log(req.body))
    .then(res.json(console.log('ticket has been successfully deleted')))
    .catch(err => console.log(err))
)

    
    
module.exports = router;