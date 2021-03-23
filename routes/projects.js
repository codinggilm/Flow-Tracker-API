const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const ProjectUser = require('../models/ProjectUser')




// Fetch all projects
router.get('/', (req, res) => Project.findAll()
    .then(projects => {
        // console.log(projects)
        res.json(projects)
        // console.log(projects) 
        // res.sendStatus(200) 
    })
    .catch(err => console.log(err))
);   

// Fetch specific project
// router.get('/:id', (req, res) => Project.findAll({
router.post('/', (req, res) => Project.findAll({
    
        where: {
            // id: req.params
            id: req.body.id
        }
    })
    .then(project => res.json(project))
    .catch(err => console.log(err))
);

//************************************************************* */

// Create a project
// router.post('/create', (req, res) => Project.create({
//         title: req.body.title,
//         description: req.body.description
//     })
//     .then(console.log(req.body.data))
//     .then(res.json('added a new project successfully'))
//     .catch(err => console.log(err))
// );

// ********** MANUEL CREATION *******************
// router.get('/create', (req, res) => {
//     const data = {
//         title: 'Project Foxtrot',
//         description: 'Yippikaye',
        
//     }

//     let {title, description} = data;

//     Project.create({
//             title,
//             description
//     })
        
    
//     .then(console.log(req.body.data))
//     .then(console.log(req.body.data))
//     .then(res.json('added a new user successfully'))
//     .catch(err => console.log(err))
// });



// Create a project  *******************************************************
router.post('/create', (req, res) => Project.create({
        title: req.body.title,
        description: req.body.description
    })
    .then(console.log(req.body.data))
    .then(project => console.log(project))
    .then(res.json('added a new project successfully'))
    .catch(err => console.log(err))
);

// Create and assign a user  *************************************************
router.post('/createWithUser', (req, res) => Project.create({
        title: req.body.title,
        description: req.body.description
    })
    .then(project => ProjectUser.create({
        userID: req.body.userId,
        username: req.body.userAdded,
        projectID: project.id,
        project: project.title 
    }))
    .then(console.log(req.body.data))
    // .then(project => console.log(project))
    // .then(project => console.log(project))
    .then(res.json('added a new project successfully'))
    .catch(err => console.log(err))
);

// Update a project ***********************************************************
router.put('/', (req, res) => Project.update({
        title: req.body.title,
        description: req.body.description
    }, 
    {
        where: {
            id: req.body.projectId
        }
    })
    .then(Ticket.update({ 
        project: req.body.title 
        },
        {
            where: {
                projectId: req.body.projectId
            }
        }
    ))
    .then(ProjectUser.update({
            project: req.body.title
        },
        {
        where: { projectID: req.body.projectId }
        }
    )) 
    .then(console.log(req.body))
    .then(res.json(console.log('project successfully updated')))
    .catch(err => console.log(err))  
)


// Update a project and remove a user from the project  ********************************************
router.put('/editAndRemoveUser', (req, res) => Project.update({
        title: req.body.title,
        description: req.body.description
    }, 
    {
        where: {
            id: req.body.projectId
        }
    })
    .then(Ticket.update({ 
        project: req.body.title 
        },  
        {
            where: {
                projectId: req.body.projectId
            }
        }
    )) 
    .then(ProjectUser.destroy(
        {
            where: {
                userID: req.body.userToRemove,
                projectID: req.body.projectId
            }
        }
    )) 
    .then(console.log(req.body))
    .then(res.json(console.log('project successfully updated and user removed')))
    .catch(err => console.log(err)) 
)



// Delete a project ( CASCADE via foreign key) ********************************************************
router.post('/delete', (req, res) => Project.destroy({
        where: {
            id: req.body.id
        }
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