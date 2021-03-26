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
  

// Fetch comments of specific Ticket **************************************
router.get('/ticket/:id', (req, res) => Comment.findAll({
        where: {
            ticketId: req.params.id
        }
    })
    .then(console.log(req.body))
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
);

// Add new comment ********************************************************
router.post('/create', (req, res) => Comment.create({
        user: req.body.user,
        userId: req.body.userId,
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


// Delete a comment *************************************************************
// router.post('/delete', (req, res) => console.log(req.body))
router.post('/delete/:id', (req, res) => Comment.destroy({
        where: {
            id: req.params.id
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
    // .then(comments => res.json(comments))
    // .then(console.log(req.body))
    .then(console.log('comment deleted successfully'))
    .catch(err => console.log(err))
)


module.exports = router;