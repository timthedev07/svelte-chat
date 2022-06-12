import { collections } from "../index";
import { ChatMessage } from "../models/ChatMessage";

export const newMessage = async (messageObj: ChatMessage) => {
  const collection = collections.chatMessages;

  if (!collection) {
    throw 503;
  }

  await collection.insertOne(messageObj);
};
