// environment variables
require("dotenv").config();

// libs
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const http = require("http");
const socket = require("socket.io");
const eventEmitter = require("events");

const { attachRoutes } = require("./src/routes");
const authRoutes = require("./src/routes/auth");

// create app
const app = express();
const router = express.Router();
const server = http.createServer(app);

// middleware
app.use(cors({ origin: process.env.ORIGIN }));

app.use(bodyparser.json());
app.use(router);

// websockets
const io = socket(server, {
  transports: ["websocket"],
});

// events
const order_event = new eventEmitter();

io.on("connection", (socket) => {
  order_event.on("message", (reference) => {
    socket.emit("new_order", reference);
  });
});

// routing
attachRoutes(router, order_event);
authRoutes(router);

// serve application
server.listen(process.env.PORT, () => {
  console.log(`listening on port http://localhost:${process.env.PORT}`);
});
