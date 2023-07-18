import { Socket } from "socket.io";
import { createRoomListener, addMemberListener } from "./listenters";

export { router as roomRouter } from "./routes";

export const setRoomListeners = (socket: Socket) => {
  socket.on("room:createRoom", createRoomListener(socket));
  socket.on("room:addMember", addMemberListener(socket));
};
