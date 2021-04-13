const fetchAllTickets = (req, res, Ticket) => {
    Ticket.findAll({
        where: {
            companyId: req.params.companyId
        }
    })
    .then(tickets => res.json(tickets))
    .then(console.log(req.params))
    .catch(err => console.log(err))
}


const fetchTicket = (req, res, Ticket) => {
    Ticket.findAll({
        where: {
            id: req.params.id
        }
    })  
    .then(ticket => res.json(ticket))
    .catch(err => console.log(err))
}


const createTicket = (req, res, Ticket) => {
    Ticket.create({
        title: req.body.title,
        description: req.body.description,
        project: req.body.project,
        projectId: req.body.projectId,
        developer: req.body.developer,
        developerId: req.body.developerId,
        priority: req.body.priority,
        status: req.body.status,
        type: req.body.type,
        submitter: req.body.submitter,
        companyId: req.body.companyId
    })
    .then(console.log(req.body))
    .then(console.log('added a new ticket successfully'))
    .then(ticket => res.json(ticket)) 
    .catch(err => console.log(err))
}


const createTicketWithComment = (req, res, Ticket, Comment) => {
    Ticket.create({
        title: req.body.title,
        description: req.body.description,
        project: req.body.project,
        projectId: req.body.projectId,
        developer: req.body.developer,
        developerId: req.body.developerId,
        priority: req.body.priority,
        status: req.body.status,
        type: req.body.type,
        submitter: req.body.submitter,
        companyId: req.body.companyId
    })
    .then(ticket => Comment.create({
        user: 'Jerry',
        userId: 1,
        role: 'Admin',
        content: req.body.comment,
        ticketId: ticket.id,
        projectId: ticket.projectId,
        project: ticket.project

    }))
    .then(console.log(req.body))
    .then(ticket => res.json(ticket))
    .then(console.log('added a new ticket and comment successfully'))
    .catch(err => console.log(err))
}


const updateTicket = (req, res, Ticket) => {
    Ticket.update(
        {
            title: req.body.title,
            description: req.body.description,
            project: req.body.project,
            projectId: req.body.projectId,
            developer: req.body.developer,
            developerId: req.body.developerId,
            priority: req.body.priority,
            status: req.body.status,
            type: req.body.type
        }, 
        {
            where: { id: req.params.id }
        }
    ) 
    .then(ticket => res.json(ticket))
    .then(console.log('updated ticket successfully'))
    .catch(err => console.log(err))
}


const saveTicketHistory = (req, res, TicketHistory) => {
    TicketHistory.create({
        property: req.body.property,
        oldValue: req.body.oldValue,
        newValue: req.body.newValue,
        ticketId: req.params.id
        
    }) 
    .then(history => res.json(history))
    .then(console.log(req.body))
    .then(console.log('saved ticket history successfully'))
    .catch(err => console.log(err)) 
}


const fetchTicketHistory = (req, res, TicketHistory) => {
    TicketHistory.findAll({
        where: { ticketId: req.params.id }
    })
    .then(console.log(req.params))
    .then(history => res.json(history))
    .catch(err => console.log(err)) 
}


const deleteTicket = (req, res, Ticket) => {
    Ticket.destroy({
        where: { id: req.params.id } 
    })
    .then(console.log(req.params))
    .then(res.json(console.log('ticket has been successfully deleted')))
    .catch(err => console.log(err)) 
}





module.exports = {
    fetchAllTickets: fetchAllTickets,
    fetchTicket: fetchTicket,
    createTicket: createTicket,
    createTicketWithComment: createTicketWithComment,
    updateTicket: updateTicket,
    saveTicketHistory: saveTicketHistory,
    fetchTicketHistory: fetchTicketHistory,
    deleteTicket: deleteTicket,
    
};