const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const ProjectUser = require('../models/ProjectUser');
const projects = require('../controllers/projects');




// Fetch all projects 
router.get('/all/:companyId', (req, res) => projects.fetchAllProjects(req, res, Project));


// Fetch all Projects of a specific User 
router.get('/user/:userId', (req, res) => projects.fetchUserProjects(req, res, ProjectUser));   


// Fetch specific project 
router.get('/:id', (req, res) => projects.fetchProject(req, res, Project));


// Create a project  
router.post('/create', (req, res) => projects.createProject(req, res, Project));


// Create a project and assign a user  
router.post('/createWithUser', (req, res) => projects.createWithUser(req, res, Project, ProjectUser));


// Update a project 
router.put('/update/:id', (req, res) => projects.updateProject(req, res, Project, Ticket, ProjectUser));


// Update a project and remove a user from the project  
router.put('/updateAndRemoveUser/:id', (req, res) => projects.updateAndRemoveUser(req, res, Project, Ticket, ProjectUser));


// Remove a User from a Project 
router.put('/remove-user/:id', (req, res) => projects.removeUser(req, res, ProjectUser));


// Delete a project ( CASCADE via foreign key) 
router.post('/delete/:id', (req, res) => projects.deleteProject(req, res, Project));







    
      
    
module.exports = router;