const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Comment = require('../models/Comment');
// const Project = require('../models/Project');
// const Ticket = require('../models/Ticket');
// const User = require('../models/User');


// Fetch all comments
router.get('/', (req, res) => Comment.findAll()
    .then(comments => {
        res.json(comments)

    })
    .catch(err => console.log(err))
);
  

// Fetch comments of specific Ticket
router.post('/', (req, res) => Comment.findAll({
        where: {
            ticketId: req.body.id
        }
    })
    .then(console.log(req.body))
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
);

// Add new comment
router.post('/create', (req, res) => Comment.create({
        user: req.body.user,
        role: req.body.role,
        content: req.body.content,
        ticketId: req.body.ticketId,
        projectId: req.body.projectId,
        project: req.body.project

    })
    .then(console.log(req.body))
    .then(comment => res.json(comment))
    .then(console.log('added a new comment successfully'))
    .catch(err => console.log(err))
);


// Delete a comment
router.post('/delete', (req, res) => Comment.destroy({
        where: {
            id: req.body.id
        } 
    })
    // .then(Comment.findAll().then(comments => res.json(comments)))
    .then(Comment.findAll({
            where: {
                ticketId: req.body.ticketId
            }
        })
    .then(comments => res.json(comments))
    )
    .then(console.log(req.body.ticketId))
    // .then(res.json('deleted comment successfully'))
    .catch(err => console.log(err))
)


module.exports = router;