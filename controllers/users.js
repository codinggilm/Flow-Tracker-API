const fetchAllUsers = (req, res, User) => {
    User.findAll({
        where: { 
            companyId: req.params.companyId 
        }
    })
    .then(users => res.json(users))
    .catch(err => console.log(err))
}


const fetchAllProjectUsers = (req, res, ProjectUser) => {
    ProjectUser.findAll({
        where: { 
            companyId: req.params.companyId 
        }
    })
    .then(projectUsers => res.json(projectUsers))
    .catch(err => console.log(err))
}


const fetchProjectUsers = (req, res, ProjectUser) => {
    ProjectUser.findAll({
        where: { 
            projectID: req.params.id
        }
    })
    .then(console.log(req.params))
    .then(projectUsers => res.json(projectUsers))
    .catch(err => console.log(err))
}


const registerUser = (req, res, User, Company, bcrypt) => {
    let existingEmail = false;
    let existingCompany = false;

    User.findAll().then(users => {
        
        for (let i=0; i<users.length; i++) {
            if(users[i].email === req.body.email) {
                existingEmail = true;
                return res.json('Email address already exists')
            }
        }

        for (let i=0; i<users.length; i++) {
            if(users[i].company === req.body.company) {
                existingCompany = true;
                let companyId = users[i].companyId
                return bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        User.create({
                            company: req.body.company,
                            companyId: companyId,
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            role: 'N/A'
                        })
                        .then(console.log(req.body))
                        .then(user => res.json({ message: 'existing company', user: user }))
                        .catch(err => res.json('unable to register:' + err))
                    });
                })
            }
        }

        if (!existingEmail && !existingCompany) {
            return bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    Company.create({ name: req.body.company })
                    
                    .then(company =>
                        User.create({
                            company: req.body.company,
                            companyId: company.id,
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            role: 'Admin'
                        })
                        .then(console.log(req.body))
                        .then(user => res.json({ message: 'new company', user: user }))
                        .catch(err => res.json('unable to register:' + err))
                    )
                });
            })
        }
    })
}

const assignUserToProject = (req, res, ProjectUser) => {
    ProjectUser.create({
        userID: req.body.userId,
        username: req.body.username,
        role: req.body.role,
        project: req.body.project, 
        projectID: req.body.projectId,
        company: req.body.company,
        companyId: req.body.companyId
    })
    .then(console.log(req.body))
    .then(res.json('user has been assigned to project successfully'))
    .catch(err => console.log(err))
}


const updateUserRole = (req, res, User, ProjectUser) => {
    User.update(
        { role: req.body.role }, 
        { where: {id: req.params.id} }
    )
    .then(ProjectUser.update(
        { role: req.body.role },
        { where: {userID: req.params.id} }
    ))
    .then(console.log(req.body, req.params))
    .then(res.json(console.log('updated user role successfully')))
    .catch(err => console.log(err)) 
}




module.exports = {
    fetchAllUsers: fetchAllUsers,
    fetchAllProjectUsers: fetchAllProjectUsers,
    fetchProjectUsers: fetchProjectUsers,
    registerUser: registerUser,
    assignUserToProject: assignUserToProject,
    updateUserRole: updateUserRole
};