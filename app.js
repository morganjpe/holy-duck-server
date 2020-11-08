// libs
require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const bodyparser = require('body-parser');

const {attachRoutes} = require('./src/routes');

// create app
const app = express();
const PORT = 3001;

// socket.io 
const http = require('http').createServer(app);
const io = socketIO(http);

// middleware
app.use(cors({
    origin: process.env.ORIGIN
}))

app.use(bodyparser.json());

// routing 
attachRoutes(app, io);

// serve application 
http.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})
