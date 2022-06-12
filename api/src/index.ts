import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const http = createServer(app);
const PORT = 8000;
const ioServer = new Server(http);

http.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

ioServer.on("connection", (_socket) => {
  console.log("new client");
});
