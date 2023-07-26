import { Socket } from "socket.io";
import { sendMessageListener } from "./listeners";

export { createMessage, validateToken } from "./controller/listenMessages";

export const setMessageListeners = (socket: Socket) => {
  socket.on("message:send", sendMessageListener(socket));
};
