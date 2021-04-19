const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
// const socketio = require('socket.io');
// const io = socketio(server, {
//     cors: {
//         origin: "http://localhost:3001",
//         methods: ["GET", "POST", "PUT"],
//         credentials: true
//     }
// });

//************************* PASSPORT **************************/

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

// Middleware
// app.use(session({
//     secret: 'secretcode',
//     resave: false,
//     saveUninitialized: true
// }))

app.use(cookieParser('secretcode'));
app.use(passport.initialize());
// app.use(passport.session());
require('./config/passport_config')(passport);

//**************************************************************** */
 
// Database
const db = require('./config/database');

 
// Confirming Connection
db.authenticate()
.then(() => console.log('connected to database..'))
.catch(err => console.log('there is an error:' + err))


app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));


// Project routes
app.use('/projects', require('./routes/projects'));
app.use('/tickets', require('./routes/tickets'));
app.use('/users', require('./routes/users'));
app.use('/comments', require('./routes/comments'));

app.get('/', (req, res) => {
    res.send('index');
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if(!user) res.json('wrong credentials');
        else {
            req.logIn(user, err => {
                if(err) res.status(400).json('wrong credentials');
                res.json(user);
                console.log('Successfully Authenticated');
            })
        }
    })(req, res, next);
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


server.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000")
});