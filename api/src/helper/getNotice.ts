import { ChatMessage } from "../mongodb/models/ChatMessage";
import { WithMessageType } from "../types";
import { getTimestampStr } from "./getTimestampStr";

export const getNotice = (notice: string, roomId: string) => {
  return {
    message: notice,
    roomId,
    senderAuthId: "~",
    timeStamp: getTimestampStr(),
    type: "notice",
  } as WithMessageType<ChatMessage>;
};
