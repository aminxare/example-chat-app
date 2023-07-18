export { authRouter } from "./user";
export { roomRouter } from "./room";
export { createMessage, validateToken } from "./message";

import { Socket } from "socket.io";
import { setRoomListeners } from "./room";

export const setListeners = (socket: Socket) => {
  setRoomListeners(socket);
};
