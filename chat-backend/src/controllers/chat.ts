import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface Message {
  payload: unknown;
  to: string;
}

export const message =
  (io: Server) =>
  (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) => {
    socket.on("message", (msg: Message) => {
      socket.to(msg.to).emit('message', {from: socket.id, payload: msg.payload})
    });
  };
