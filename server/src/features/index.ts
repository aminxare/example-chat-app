export { authRouter } from "./user";
export { roomRouter } from "./room";
export { createMessage, validateToken } from "./message";

import { Socket } from "socket.io";
import { setRoomListeners } from "./room";
import { setMessageListeners } from "./message";

export const setListeners = (socket: Socket) => {
  setRoomListeners(socket);
  setMessageListeners(socket);
};
