const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
// const Project_ = require('./models/Project_');
// const Ticket_ = require('./models/Ticket_');
// const User_ = require('./models/User_');
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST", "PUT"],
      credentials: true
    }
});




 
// Database
const db = require('./config/database');

 
// Testing Connection
db.authenticate()
.then(() => console.log('connected to database..'))
.catch(err => console.log('there is an error:' + err))


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('index');
})
 

// Project routes
app.use('/projects', require('./routes3/projects'))
app.use('/users', require('./routes3/users'))
// app.use('/tickets', require('./routes3/tickets'))
// app.use('/comments', require('./routes3/comments'))



server.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000")
})