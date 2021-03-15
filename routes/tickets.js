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


// Update a ticket

// router.put('/', (req, res) => console.log(req.body.data))
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
// .then(Project.update(
//     {
//     project: req.body.data.title
//     },
//     {
//         where: {
//             projectId: req.body.id
//         }
//     }
    
// ))
.then(console.log(req.body.data))
.then(res.json('updated ticket successfully'))
.catch(err => console.log(err)) 
)
    
    
module.exports = router;