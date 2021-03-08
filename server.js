const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
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
.then(() => console.log('database is connected'))
.catch(err => console.log('there is an error:' + err))


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('index');
})
 

// Project routes
app.use('/projects', require('./routes/projects'))




server.listen(process.env.PORT || 3000, () => {
    console.log("server is running on port 3000")
})