import { ObjectId } from "mongodb";

export class ChatMessage {
  constructor(
    public senderAuthId: string,
    public message: string,
    public timeStamp: string,
    public roomId: string,
    public id?: ObjectId
  ) {}
}
