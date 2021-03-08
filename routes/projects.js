const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Project = require('../models/Project');


// Get list of all projects
router.get('/', (req, res) => Project.findAll()
    .then(projects => {
        console.log(projects)
        res.sendStatus(200)
    })
    .catch(err => console.log(err))
);

    
// Add a project
router.get('/add', (req, res) => {
    const data = {
        title: 'Test Project',
        description: 'this is a test'
    }

    // let { title, description } = data;

    Project.create({
        title: data.title,
        description: data.description
    })
    .then(project => res.redirect('/projects'))
    .catch(err => console.log(err))
});
    
    
module.exports = router;