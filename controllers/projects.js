const fetchAllProjects = (req, res, Project) => {
    Project.findAll({
        where: { companyId: req.params.companyId }
    })
    .then(projects => res.json(projects))
    .catch(err => console.log(err))
};


const fetchUserProjects = (req, res, ProjectUser) => {
    ProjectUser.findAll({
        where: { userID: req.params.userId }
    })
    .then(project => res.json(project))
    .catch(err => console.log(err))
};


const fetchProject = (req, res, Project) => {
    Project.findAll({
        where: { id: req.params.id }
    })
    .then(project => res.json(project))
    .catch(err => console.log(err))
};


const createProject = (req, res, Project) => {
    Project.create({
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        companyId: req.body.companyId
    })
    .then(console.log(req.body))
    .then(res.json('added a new project successfully'))
    .catch(err => console.log(err))
};


const createWithUser = (req, res, Project, ProjectUser) => {
    Project.create({
        title: req.body.title,
        description: req.body.description,
        company: req.body.company,
        companyId: req.body.companyId
    })
    .then(project => ProjectUser.create({
        userID: req.body.userId,
        username: req.body.userAdded,
        role: req.body.role,
        projectID: project.id,
        project: project.title,
        company: req.body.company,
        companyId: req.body.companyId 
    }))
    .then(console.log(req.body))
    .then(res.json('added a new project successfully'))
    .catch(err => console.log(err))
};


const updateProject = (req, res, Project, Ticket, ProjectUser) => {
    Project.update({
        title: req.body.title,
        description: req.body.description
    }, 
    {
        where: { id: req.params.id }
    })
    .then(Ticket.update(
        { project: req.body.title },
        {
            where: { projectId: req.params.id }
        }
    ))
    .then(ProjectUser.update(
        { project: req.body.title },
        {
            where: { projectID: req.params.id }
        }
    )) 
    .then(console.log(req.body))
    .then(res.json(console.log('project successfully updated')))
    .catch(err => console.log(err)) 
};


const updateAndRemoveUser = (req, res, Project, Ticket, ProjectUser) => {
    Project.update({
            title: req.body.title,
            description: req.body.description
        }, 
        {   where: { id: req.params.id } 
    })
    .then(Ticket.update(
        { project: req.body.title }, 
        {
            where: { projectId: req.params.id }
        }
    )) 
    .then(ProjectUser.destroy({
        where: {
            userID: req.body.userToRemove,
            projectID: req.params.id
        }
    })) 
    .then(console.log(req.body))
    .catch(err => console.log(err)) 
    .then(res.json(console.log('project successfully updated and user removed')))
};


const removeUser = (req, res, ProjectUser) => {
    ProjectUser.destroy({
        where: {
            projectID: req.params.id,
            userID: req.body.userId
        }
    })
    .then(console.log(req.body))
    .catch(err => console.log(err)) 
    .then(res.json(console.log('user successfully removed removed')))
};


const deleteProject = (req, res, Project) => {
    Project.destroy({
        where: { id: req.params.id }
    })
    
    .then(console.log(req.body))
    .then(res.json(console.log('project and all associated tickets have been successfully deleted')))
    .catch(err => console.log(err))
};


module.exports = {
    fetchAllProjects: fetchAllProjects,
    fetchUserProjects: fetchUserProjects,
    fetchProject: fetchProject,
    createProject: createProject,
    createWithUser: createWithUser,
    updateProject: updateProject,
    updateAndRemoveUser: updateAndRemoveUser,
    removeUser: removeUser,
    deleteProject: deleteProject
};