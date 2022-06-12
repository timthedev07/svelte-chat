import { collections } from "../index";

export const loadMessages = async (roomId: string) => {
  const collection = collections.chatMessages;

  if (!collection) {
    throw 503;
  }

  return await collection
    .find({
      roomId,
    })
    .toArray();
};
