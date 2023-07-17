import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Broker } from "../lib/broker";

interface RooCreatePayload {
  userId: number;
  name: string;
}

export const room =
  (io: Server) =>
  (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  (broker: Broker) => {
    socket.on("roomCreate", async (msg: RooCreatePayload) => {
      // const token
      // console.log(msg)

      // await broker.sendMessage("message-create", [
      //   JSON.stringify(messageDetail),
      // ]);

      // socket
      //   .to(msg.to)
      //   .emit("message", { payload: msg.payload, from: socket.id });
    });
  };
