const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const User = require('../models/User');



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
router.post('/', (req, res) => Project.findAll({
        where: {
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



// Create a project and assign user
router.post('/create', (req, res) => Project.create({
        title: req.body.title,
        description: req.body.description
    })
    .then(console.log(req.body.data))
    .then(res.json('added a new project successfully'))
    .catch(err => console.log(err))
);

// Update a project
router.put('/', (req, res) => Project.update({
        title: req.body.data.title,
        description: req.body.data.description
    }, 
    {
        where: {
            id: req.body.id
        }
    })
    .then(Ticket.update({ 
        project: req.body.data.title 
        },
        {
            where: {
                projectId: req.body.id
            }
        }
    )) 
    .then(console.log(req.body.data))
    .then(res.json(console.log('project successfully updated')))
    .catch(err => console.log(err))  
)


// Update a project and remove a user from the project
router.put('/editAndRemoveUser', (req, res) => Project.update({
        title: req.body.data.title,
        description: req.body.data.description
    }, 
    {
        where: {
            id: req.body.id
        }
    })
    .then(Ticket.update({ 
        project: req.body.data.title 
        },
        {
            where: {
                projectId: req.body.id
            }
        }
    )) 
    .then(User.update(
        { projectId: null },
            {
                where: {
                    username: req.body.data.userToRemove
                }
            }
        )
    )
    .then(console.log(req.body.data))
    .then(res.json(console.log('project successfully updated and user removed')))
    .catch(err => console.log(err)) 
)



// Delete a project
router.post('/delete', (req, res) => Project.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(Ticket.destroy({
            where: {
                projectId: req.body.id
            }
        }
        
    ))
    .then(console.log(req.body.data))
    .then(res.json(console.log('project and all associated tickets have been successfully deleted')))
    .catch(err => console.log(err))
)






    
      
    
module.exports = router;