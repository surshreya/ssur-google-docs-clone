//Importing core modules
const cors = require("cors");

//Importing external dependencies
const express = require("express");
const socketio = require("socket.io");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

module.exports = app;
