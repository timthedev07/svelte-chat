export type MessageType = "notice" | "message";
export type WithMessageType<T> = T & {
  type: MessageType;
};
