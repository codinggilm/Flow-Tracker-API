const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// let salt = bcrypt.genSaltSync(10);
// let hash = bcrypt.hashSync("B4c0/\/", salt);
const db = require('../config/database');
const User = require('../models/User');
const ProjectUser = require('../models/ProjectUser')
// const Project = require('../models/Project');
// const Ticket = require('../models/Ticket');



// Fetch all users ******************************************************************
router.get('/', (req, res) => User.findAll()
    .then(users => {
        res.json(users)
    })
    .then(console.log(req.body))
    .catch(err => console.log(err))
); 

// Fetch all users of a project *****************************************************
router.get('/project-users/:id', (req, res) => ProjectUser.findAll({
        where: { 
            projectID: req.params.id
        }
    })
    .then(console.log(req.body))
    .then(projectUsers => res.json(projectUsers))
    .catch(err => console.log(err))
)

// // Fetch specific user **********************************************************
// router.post('/', (req, res) => User.findAll({
//         where: {
//             id: req.body.id
//         } 
//     })  
//     .then(console.log(req.body))
//     .then(user => res.json(user))
//     .catch(err => console.log(err))
// );

// // Login a user  ********************************************************************
router.post('/login', (req,res) => {

    User.findOne({
        where: {
            // email: req.body.email
            username: req.body.username
        }
    })
    .then(user => {
        // if (bcrypt.compareSync(req.body.password, user.dataValues.password) && req.body.email === user.dataValues.email) {
        if (bcrypt.compareSync(req.body.username, user.dataValues.password) && req.body.username === user.dataValues.username) {
            console.log('success!')
            console.log(user.dataValues)
            res.json(user.dataValues)
        } else {
            console.log('nu huh')
        }
    })
    .catch(err => res.status(400).json('no such user' + err))
})


// // Register a user  ********************************************************************
router.post('/register', (req, res) => {

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            User.create({
                company: req.body.company,
                username: req.body.username,
                password: hash,
                email: req.body.email,
            })
            .then(console.log(req.body))
            .then(res.json('created new user successfully'))
            .catch(err => res.json('unable to register:' + err))
        });
    })

});
  
 
// Assign user to Project ******************************************
router.post('/assign-project', (req, res) => ProjectUser.create({
        userID: req.body.userId,
        username: req.body.username,
        projectID: req.body.projectId,
        project: req.body.project 
    })
    .then(console.log(req.body))
    // .then(userProject => console.log(userProject)) 
    .then(res.json(console.log('user has been assigned to project successfully')))
    .catch(err => console.log(err))
) 


// Update a user's role ********************************************************************
router.put('/role/:id', (req, res) => User.update(
        {
            role: req.body.role,
            
        }, 
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(console.log(req.body))
    .then(res.json(console.log('updated user role successfully')))
    .catch(err => console.log(err)) 
)




    
module.exports = router;