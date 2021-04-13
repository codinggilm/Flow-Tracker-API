const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const User = require('../models/User');
const ProjectUser = require('../models/ProjectUser');
const Company = require('../models/Company');
const users = require('../controllers/users');


// Fetch all users
router.get('/:companyId', (req, res) => users.fetchAllUsers(req, res, User));


// Fetch all users assigned to Projects
router.get('/all/project-users/:companyId', (req, res) => users.fetchAllProjectUsers(req, res, ProjectUser));


// Fetch all users assigned to a specific project
router.get('/project-users/:id', (req, res) => users.fetchProjectUsers(req, res, ProjectUser));


// Register a user
router.post('/register', (req, res) => users.registerUser(req, res, User, Company, bcrypt));


// Assign a user to a Project 
router.post('/assign-project', (req, res) => users.assignUserToProject(req, res, ProjectUser));


// Update a user's role
router.put('/role/:id', (req, res) => users.updateUserRole(req, res, User, ProjectUser));





    
module.exports = router;