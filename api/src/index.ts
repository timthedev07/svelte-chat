import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";

config();

const app = express();
const http = createServer(app);
const PORT = 8000;
const ioServer = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

http.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

ioServer.on("connection", (socket) => {
  console.log("new client");

  // new message handler
  socket.on("message", (message: string) => {
    const messageObj = {
      from: "Jack",
      message,
      time: new Date().toLocaleString(),
    };
    ioServer.emit("message", messageObj);
  });
});
