import { Socket, Server } from "socket.io";
import { getNotice } from "../helper/getNotice";
import { getTimestampStr } from "../helper/getTimestampStr";
import { loadMessages } from "../mongodb/functions/loadMessages";
import { newMessage } from "../mongodb/functions/newMessage";
import { ChatMessage } from "../mongodb/models/ChatMessage";

const handler = (socket: Socket, ioServer: Server) => {
  console.log("new client");

  // join room handler
  socket.on(
    "joinRoom",
    async ({ userId, roomId }: { [key: string]: string }) => {
      // join the room
      socket.join(roomId);

      const existingMessages = await loadMessages(roomId);

      // populate existing messages
      socket.emit("loadMessages", existingMessages);

      // notice message
      socket.broadcast
        .to(roomId)
        .emit(
          "message",
          getNotice(`user<${userId}> has joined the room`, roomId)
        );

      socket.on("message", (message: string) => {
        const messageObj = {
          senderAuthId: "abcdefg12345",
          message,
          timeStamp: getTimestampStr(),
          roomId: "public",
        } as ChatMessage;

        ioServer.to(roomId).emit("message", {
          ...messageObj,
          type: "message",
        });

        newMessage(messageObj);
      });

      socket.on("disconnect", () => {
        ioServer
          .to(roomId)
          .emit(
            "message",
            getNotice(`user<${userId}> has left the room`, roomId)
          );
      });
    }
  );
};

export const onConnection = (ioServer: Server) => {
  return (socket: Socket) => handler(socket, ioServer);
};
