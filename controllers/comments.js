const fetchAllComments = (req, res, Comment) => {
    Comment.findAll()
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
}


const fetchTicketComments = (req, res, Comment) => {
    Comment.findAll({
        where: {
            ticketId: req.params.id
        }
    })
    .then(console.log(req.params))
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
}


const createComment = (req, res, Comment) => {
    Comment.create({
        user: req.body.user,
        userId: req.body.userId,
        role: req.body.role,
        content: req.body.content,
        ticketId: req.body.ticketId,
        projectId: req.body.projectId,
        project: req.body.project

    })
    .then(console.log(req.body))
    .then(comment => res.json(comment))
    .then(console.log('added a new comment successfully'))
    .catch(err => console.log(err))
}


const deleteComment = (req, res, Comment) => {
    Comment.destroy({
        where: {
            id: req.params.id
        } 
    })
    .then(Comment.findAll({
        where: {
            ticketId: req.body.ticketId
        }
    })
    .then(comments => res.json(comments))
    )
 
    .then(console.log('comment deleted successfully'))
    .catch(err => console.log(err))
}






module.exports = {
    fetchAllComments: fetchAllComments,
    fetchTicketComments: fetchTicketComments,
    createComment: createComment,
    deleteComment: deleteComment,
    
};