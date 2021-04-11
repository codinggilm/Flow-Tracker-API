const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const User = require('../models/User');
const ProjectUser = require('../models/ProjectUser')
const Company = require('../models/Company')


// Fetch all users *********************************************
router.get('/:companyId', (req, res) => User.findAll({
        where: { 
            companyId: req.params.companyId 
        }
    })
    .then(users => res.json(users))
    .catch(err => console.log(err))
);


// Fetch all users assigned to Projects *****************************
router.get('/all/project-users/:companyId', (req, res) => ProjectUser.findAll({
        where: { 
            companyId: req.params.companyId 
        }
    })
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

    let existingEmail = false;
    let existingCompany = false;

    User.findAll().then(users => {
        
        for (let i=0; i<users.length; i++) {
            if(users[i].email === req.body.email) {
                existingEmail = true;
                return res.json('Email address already exists')
            }
        }

        for (let i=0; i<users.length; i++) {
            if(users[i].company === req.body.company) {
                existingCompany = true;
                let companyId = users[i].companyId
                return bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        User.create({
                            company: req.body.company,
                            companyId: companyId,
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            role: 'N/A'
                        })
                        .then(console.log(req.body))
                        .then(user => res.json({ message: 'existing company', user: user }))
                        // .then(user => res.json(user))
                        .catch(err => res.json('unable to register:' + err))
                    });
                })
            }
        }

        if (!existingEmail && !existingCompany) {
            return bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    Company.create({ name: req.body.company })
                    
                    .then(company =>
                        User.create({
                            company: req.body.company,
                            companyId: company.id,
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            role: 'Admin'
                        })
                        .then(console.log(req.body))
                        .then(user => res.json({ message: 'new company', user: user }))
                        .catch(err => res.json('unable to register:' + err))
                    )
                });
            })
        }
    })

});
  
 
// Assign user to Project ******************************************
router.post('/assign-project', (req, res) => ProjectUser.create({
        userID: req.body.userId,
        username: req.body.username,
        role: req.body.role,
        project: req.body.project, 
        projectID: req.body.projectId,
        company: req.body.company,
        companyId: req.body.companyId
    })
    .then(console.log(req.body))
    .then(res.json('user has been assigned to project successfully'))
    .catch(err => console.log(err))
); 


// Update a user's role ************************************************
router.put('/role/:id', (req, res) => User.update(
        { role: req.body.role }, 
        { where: {id: req.params.id} }
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