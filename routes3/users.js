const express = require('express');
const router = express.Router();
const db = require('../config/database');
const User = require('../models3/User');
// const Project = require('../models/Project');
// const Ticket = require('../models/Ticket');



// Fetch all users
router.get('/', (req, res) => User.findAll()
    .then(users => {
        res.json(users)
    })
    .catch(err => console.log(err))
);

// // Fetch specific user
router.post('/', (req, res) => User.findAll({
        where: {
            id: req.body.id
        }
    })  
    .then(user => res.json(user))
    .catch(err => console.log(err))
);

// // Add a user
// *************  MANUAL ********************************* //
router.get('/create', (req, res) => {
    const data = {
        username: 'David Schwartz'
        // password: '123',
        // email: 'derek@mail.com',
        // role: 'Submitter',
        // projectId: null,
        // ticketId: null
    }

    // let {username, password, email, role, projectId, ticketId} = data;
    let {username} = data;

    User.create({
        username
    })
        
    
    .then(user => res.json(user))
    // .then(console.log(req.body.data))
    // .then(res.json('added a new user successfully'))
    // .catch(err => console.log(err))
});


// router.post('/create', (req, res) => User.create({
//         username: req.body.username,
//         password: req.body.password,
//         email: req.body.email,
//         role: req.body.role,
//         projectId: req.body.projectId,
//         ticketId: req.body.ticketId
//     })
//     .then(console.log(req.body.data))
//     .then(res.json('added a new project successfully'))
//     .catch(err => console.log(err))
// );


/******************************************************************** */

// Update a user
router.put('/', (req, res) => User.update(
        {
            role: req.body.role,
            project: req.body.project,
            projectId: req.body.projectId

        }, 
        {
            where: {
                username: req.body.username
            }
        }
    )
    .then(console.log(req.body))
    .then(res.json(console.log('updated user role successfully')))
    .catch(err => console.log(err)) 
)








    
      
    
module.exports = router;