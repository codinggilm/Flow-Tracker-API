const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const ProjectUser = require('../models/ProjectUser')




// Fetch all projects *************************************
router.get('/all/:companyId', (req, res) => Project.findAll({
        where: { companyId: req.params.companyId }
    })
    .then(projects => res.json(projects))
    .catch(err => console.log(err))
);

// Fetch all Projects of a specific User *******************
router.get('/user/:userId', (req, res) => {
    
    ProjectUser.findAll({
        where: { userID: req.params.userId }
    })
    .then(project => res.json(project))
    .catch(err => console.log(err))
});   

// Fetch specific project ***********************************
router.get('/:id', (req, res) => Project.findAll({
        where: { id: req.params.id }
    })
    .then(project => res.json(project))
    .catch(err => console.log(err))
);


// Create a project  *******************************************************
router.post('/create', (req, res) => Project.create(
    {
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        companyId: req.body.companyId
    })
    // .then(project => console.log(project))
    .then(console.log(req.body))
    .then(res.json('added a new project successfully'))
    .catch(err => console.log(err))
);

// Create a project and assign a user  *************************************************
router.post('/createWithUser', (req, res) => Project.create({
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        companyId: req.body.companyId
    })
    .then(project => ProjectUser.create({
        userID: req.body.userId,
        username: req.body.userAdded,
        role: req.body.role,
        projectID: project.id,
        project: project.title,
        company: req.body.company,
        companyId: req.body.companyId 
    }))
    .then(console.log(req.body))
    .then(res.json('added a new project successfully'))
    .catch(err => console.log(err))
);

// Update a project ***********************************************************
router.put('/update/:id', (req, res) => Project.update({
        title: req.body.title,
        description: req.body.description
    }, 
    {
        where: { id: req.params.id }
    })
    .then(Ticket.update(
        { project: req.body.title },
        {
            where: { projectId: req.params.id }
        }
    ))
    .then(ProjectUser.update(
        { project: req.body.title },
        {
            where: { projectID: req.params.id }
        }
    )) 
    .then(console.log(req.body))
    .then(res.json(console.log('project successfully updated')))
    .catch(err => console.log(err))  
)


// Update a project and remove a user from the project  ********************************************
router.put('/updateAndRemoveUser/:id', (req, res) => Project.update(
    {
        title: req.body.title,
        description: req.body.description
    }, 
    {
        where: { id: req.params.id }
    })
    .then(Ticket.update(
        { project: req.body.title }, 
        {
            where: { projectId: req.params.id }
        }
    )) 
    .then(ProjectUser.destroy({
        where: {
            userID: req.body.userToRemove,
            projectID: req.params.id
        }
    })) 
    .then(console.log(req.body))
    .catch(err => console.log(err)) 
    .then(res.json(console.log('project successfully updated and user removed')))
)

// Remove a User from a Project
router.put('/remove-user/:id', (req, res) => ProjectUser.destroy({
        where: {
            projectID: req.params.id,
            userID: req.body.userId
        }
    })
    .then(console.log(req.body))
    .catch(err => console.log(err)) 
    .then(res.json(console.log('user successfully removed removed')))
)

// Delete a project ( CASCADE via foreign key) ********************************************************
router.post('/delete/:id', (req, res) => Project.destroy({
        where: { id: req.params.id }
    })
    // .then(Ticket.destroy({
    //         where: {
    //             projectId: req.body.id
    //         }
    //     }
        
    // ))
    // .then(ProjectUser.destroy(
    //     {
    //         where: { projectID: req.body.id }
    //     }
    // ))
    .then(console.log(req.body.data))
    .then(res.json(console.log('project and all associated tickets have been successfully deleted')))
    .catch(err => console.log(err))
)






    
      
    
module.exports = router;