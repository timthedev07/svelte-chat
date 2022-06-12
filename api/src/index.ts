import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { onConnection } from "./lib/onConnection";
import { connectDB } from "./mongodb";

(async () => {
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

  await connectDB();

  ioServer.on("connection", onConnection(ioServer));
})();
