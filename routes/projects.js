const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Project = require('../models/Project');


// Get list of all projects
router.get('/', (req, res) => Project.findAll()
    .then(projects => {
        // console.log(projects)
        res.json(projects)
        console.log(projects)
        // res.sendStatus(200)
    })
    .catch(err => console.log(err))
);

// Get specific project
// router.post('/', (req, res) => {
//     console.log(req.body.id)
// })

router.post('/', (req, res) => Project.findAll({
        where: {
            id: req.body.id
        }
    })
    .then(project => {
        res.json(project)
        console.log(project)
    })
    .catch(err => console.log(err))
);
    
// Add a project
router.post('/', (req, res) => {
    // const data = {
    //     title: 'Another Test Project',
    //     description: 'this is the second test'
    // }
    // console.log(req.body)
    const data = {
        title: req.body.title,
        description: req.body.description
    }

    // // Validation
    // let errors = [];
    // if (!title) {
    //     errors.push({text: 'Please add a title'})
    // }
    // if (!description) {
    //     errors.push({text: 'Please add a description'})
    // }

    // // Error check
    // if (errors.length > 0) {

    // } else {
    //     Project.create({
    //         title: data.title,
    //         description: data.description
    //     })
    //     // .then(project => res.redirect('/projects'))
    //     .then(res.json('added a project successfully'))
    //     .catch(err => console.log(err))
    // }

    Project.create({
        title: data.title,
        description: data.description
    })
    // .then(project => res.redirect('/projects'))
    .then(res.json('added a project successfully'))
    .catch(err => console.log(err))

});
      
    
module.exports = router;