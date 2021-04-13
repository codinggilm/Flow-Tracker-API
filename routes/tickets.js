const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Ticket = require('../models/Ticket'); 
const Comment = require('../models/Comment');
const TicketHistory = require('../models/TicketHistory');
const tickets = require('../controllers/tickets');
 

// Fetch all tickets
router.get('/all/:companyId', (req, res) => tickets.fetchAllTickets(req, res, Ticket));
 

// Fetch specific ticket 
router.get('/:id', (req, res) => tickets.fetchTicket(req, res, Ticket));


// Create a ticket 
router.post('/create', (req, res) => tickets.createTicket(req, res, Ticket));


// Create a ticket with a comment
router.post('/createWithComment', (req, res) => tickets.createTicketWithComment(req, res, Ticket, Comment));


// Update a ticket 
router.put('/update/:id', (req, res) => tickets.updateTicket(req, res, Ticket));


// Save Ticket History 
router.post('/save-history/:id', (req, res) => tickets.saveTicketHistory(req, res, TicketHistory));


// Get Ticket History 
router.get('/history/:id', (req, res) => tickets.fetchTicketHistory(req, res, TicketHistory));


// Delete a ticket
router.post('/delete/:id', (req, res) => tickets.deleteTicket(req, res, Ticket));


    
    
module.exports = router;