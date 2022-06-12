import * as mongoDB from "mongodb";
import { ChatMessage } from "./models/ChatMessage";

export const collections: {
  chatMessages?: mongoDB.Collection<ChatMessage>;
} = {};

export const connectDB = async () => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const chatMessagesCollection: mongoDB.Collection =
    db.collection("chat_messages");

  collections.chatMessages = chatMessagesCollection as any;

  console.log(
    `Access to collections "${chatMessagesCollection.collectionName}" granted.`
  );
};
