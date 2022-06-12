import { Socket, Server } from "socket.io";

const handler = (socket: Socket, ioServer: Server) => {
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
};

export const onConnection = (ioServer: Server) => {
  return (socket: Socket) => handler(socket, ioServer);
};
