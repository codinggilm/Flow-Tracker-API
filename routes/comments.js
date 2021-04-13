const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Comment = require('../models/Comment');
const comments = require('../controllers/comments');


// Fetch all comments  
router.get('/', (req, res) => comments.fetchAllComments(req, res, Comment));

  
// Fetch comments of a Ticket
router.get('/ticket/:id', (req, res) => comments.fetchTicketComments(req, res, Comment));


// Add new comment
router.post('/create', (req, res) => comments.createComment(req, res, Comment));


// Delete a comment 
router.post('/delete/:id', (req, res) => comments.deleteComment(req, res, Comment));



module.exports = router;