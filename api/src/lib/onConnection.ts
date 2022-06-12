import { Socket, Server } from "socket.io";
import { newMessage } from "../mongodb/functions/newMessage";
import { ChatMessage } from "../mongodb/models/ChatMessage";

const handler = (socket: Socket, ioServer: Server) => {
  console.log("new client");

  // new message handler
  socket.on("message", (message: string) => {
    const messageObj = {
      senderAuthId: "abcdefg12345",
      message,
      timeStamp: new Date().toLocaleString(),
      roomId: "qwerty",
    } as ChatMessage;

    ioServer.emit("message", messageObj);

    newMessage(messageObj);
  });
};

export const onConnection = (ioServer: Server) => {
  return (socket: Socket) => handler(socket, ioServer);
};
