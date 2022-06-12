import ioClient from "socket.io-client";

const ENDPOINT = "http://localhost:8000";

export const io = ioClient(ENDPOINT);
