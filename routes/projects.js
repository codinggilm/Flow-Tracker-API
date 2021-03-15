const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');



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

// Add a project
router.post('/create', (req, res) => Project.create({
        title: req.body.title,
        description: req.body.description
    })
    // .then(project => res.redirect('/projects'))
    .then(res.json('added a new project successfully'))
    .catch(err => console.log(err))
);

// Update a project
router.put('/', (req, res) => Project.update(
        {
            title: req.body.data.title,
            description: req.body.data.description
        }, 
        {
            where: {
                id: req.body.id
            }
        }
    )
    .then(Ticket.update(
        {
        project: req.body.data.title
        },
        {
            where: {
                projectId: req.body.id
            }
        }
        
    ))
    .then(res.json('updated project successfully'))
    .catch(err => console.log(err)) 
)

// router.post('/delete', (req, res) => console.log(req.body))

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
    .then(console.log('project and all associated tickets have been successfully deleted'))
    .catch(err => console.log(err))
)




    
      
    
module.exports = router;