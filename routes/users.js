const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const User = require('../models/User');
const ProjectUser = require('../models/ProjectUser')


// Fetch all users *********************************************
router.get('/', (req, res) => User.findAll()
    .then(users => {
        res.json(users)
    })
    .then(console.log(req.body))
    .catch(err => console.log(err))
);


// Fetch all users assigned to Projects *****************************
router.get('/project-users', (req, res) => ProjectUser.findAll()
    .then(projectUsers => res.json(projectUsers))
    .catch(err => console.log(err))
);


// Fetch all users of a specific project **********************************
router.get('/project-users/:id', (req, res) => ProjectUser.findAll({
        where: { 
            projectID: req.params.id
        }
    })
    .then(console.log(req.body))
    .then(projectUsers => res.json(projectUsers))
    .catch(err => console.log(err))
);


// Register a user  ********************************************************************
router.post('/register', (req, res) => {

    const existingEmail = User.findOne({
        where : {
            email: req.body.email
        }
    })

    User.findOne({
        where : {
            username: req.body.username
        }
    })
    .then(user => {
        if (user) {
            res.json('User already exists ')
        } else if (existingEmail) {
            res.json('Email already exists ')
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
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
        }
    })
    .catch(err => console.log(err))
});
  
 
// Assign user to Project ******************************************
router.post('/assign-project', (req, res) => ProjectUser.create({
        userID: req.body.userId,
        username: req.body.username,
        projectID: req.body.projectId,
        project: req.body.project 
    })
    .then(console.log(req.body))
    .then(res.json('user has been assigned to project successfully'))
    .catch(err => console.log(err))
); 


// Update a user's role ********************************************************************
router.put('/role/:id', (req, res) => User.update(
    { role: req.body.role }, 
        { where: { id: req.params.id } }
    )
    .then(ProjectUser.update(
        { role: req.body.role },
        { where: {userID: req.params.id} }
    ))
    .then(console.log(req.body))
    .then(res.json(console.log('updated user role successfully')))
    .catch(err => console.log(err)) 
);




    
module.exports = router;