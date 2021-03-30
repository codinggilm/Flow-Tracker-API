const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// let salt = bcrypt.genSaltSync(10);
// let hash = bcrypt.hashSync("B4c0/\/", salt);
const db = require('../config/database');
const User = require('../models/User');
const ProjectUser = require('../models/ProjectUser')
// const Project = require('../models/Project');
// const Ticket = require('../models/Ticket');


//********** PASSPORT *******************/
// const initializePassport = require('../config/passport');

// initializePassport(passport);
// initializePassport(passport, email => {
//     users.find(user => user.email === email)
// });

// const passport = require('passport');
// const flash = require('express-flash')
// const session = require('express-session')
// const initializePassport = require('../config/passport');

// initializePassport(passport, email => {
//     users.find(user => user.email === email)
// });

// app.use(flash())
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())



// User login **********************************************************************
// router.post('/login', passport.authenticate('local', {
//     successRedirect: 'http://localhost:3001',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

// Fetch all users ******************************************************************
router.get('/', (req, res) => User.findAll()
    .then(users => {
        res.json(users)
    })
    .then(console.log(req.body))
    .catch(err => console.log(err))
); 

// Fetch all users of a project *****************************************************
router.get('/project-users/:id', (req, res) => ProjectUser.findAll({
        where: { 
            projectID: req.params.id
        }
    })
    .then(console.log(req.body))
    .then(projectUsers => res.json(projectUsers))
    .catch(err => console.log(err))
)


//// Login a user  ********************************************************************
// router.post('/login', passport.authenticate('local', {
//     successRedirect: 'http://localhost:3001',
//     failureRedirect: '/login',
//     failureFlash: true
// }))

// router.post('/login', (req,res) => {
//     // console.log(req.body)

//     User.findOne({
//         where: {
//             // email: req.body.email
//             username: req.body.username
//         }
//     })
//     .then( user => { 
//         // console.log(user.json())
//         if (!user) console.log('There is no such user in our database') 
//         if (bcrypt.compareSync(req.body.password, user.dataValues.password) && req.body.username === user.dataValues.username) {
//             console.log('success!')
//             // console.log(user.json()
//             res.json(user)
//         } else {
//             console.log('nu huh')
//         }
    
    
//     })
//     .catch(err => res.status(400).json('no such user' + err))
// })



// // Register a user  ********************************************************************
router.post('/register', (req, res) => {

    const existingEmail = User.findOne({
        where :{email: req.body.email}
    })

    User.findOne({
        where :{username: req.body.username}
    })
    .then(user => {
        if (user) {
            res.json('User already exists ')
        } else if (existingEmail) {
            res.json('Email already exists ')
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    User.create({
                        company: req.body.company,
                        username: req.body.username,
                        password: hash,
                        email: req.body.email,
                    })
                    .then(console.log(req.body))
                    .then(res.json('created new user successfully'))
                    .catch(err => res.json('unable to register:' + err))
                });
            })
        }
    })
    .catch(err => console.log(err))
});
  
 
// Assign user to Project ******************************************
router.post('/assign-project', (req, res) => ProjectUser.create({
        userID: req.body.userId,
        username: req.body.username,
        projectID: req.body.projectId,
        project: req.body.project 
    })
    .then(console.log(req.body))
    // .then(userProject => console.log(userProject)) 
    .then(res.json(console.log('user has been assigned to project successfully')))
    .catch(err => console.log(err))
) 


// Update a user's role ********************************************************************
router.put('/role/:id', (req, res) => User.update(
        {
            role: req.body.role,
            
        }, 
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(console.log(req.body))
    .then(res.json(console.log('updated user role successfully')))
    .catch(err => console.log(err)) 
)




    
module.exports = router;