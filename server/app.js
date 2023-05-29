//Importing core modules
const http = require("http");
const cors = require("cors");

//Importing external dependencies
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("connected");
});

module.exports = server;
