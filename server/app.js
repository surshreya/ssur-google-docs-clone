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
  socket.on("get-document", async (documentId) => {
    const document = "data";
    socket.join(documentId);
    socket.emit("load-document", document);

    socket.on("send-user-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-user-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await updateDocument(documentId, data);
    });
  });
});

module.exports = server;
