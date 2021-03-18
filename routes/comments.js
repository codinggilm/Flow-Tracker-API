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


// Fetch specific comment
router.post('/', (req, res) => Comment.findAll({
        where: {
            id: req.body.id
        }
    })  
    .then(comment => res.json(comment))
    .catch(err => console.log(err))
);


// // Add a Comment
// *************  MANUAL ********************************* //
// router.get('/create', (req, res) => {
//     const data = {
//         user: 'Joddy Jones',
//         content: 'the best comment',
//         role: 'Project Manager',
//         projectId: 35,
//         ticketId: 18,
//         project: 'Black Sabbath'
//     }

//     let {user, content, role, projectId, ticketId, project} = data;

//     Comment.create({
//         user,
//         content,
//         role,
//         projectId,
//         ticketId,
//         project
//     })
        
    
//     // .then(console.log(req.body.data))
//     .then(console.log(req.body))
//     .then(res.json('added a new comment successfully'))
//     .catch(err => console.log(err))
// });

router.post('/create', (req, res) => Comment.create({
        user: req.body.username,
        role: req.body.role,
        content: req.body.content,
        ticketId: req.body.ticketId,
        projectId: req.body.projectId,
        project: req.body.project

    })
    .then(console.log(req.body.data))
    .then(res.json('added a new comment successfully'))
    .catch(err => console.log(err))
);


module.exports = router;