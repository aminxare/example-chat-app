import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
// import Broker from "../lib/broker";
import pipeline from "../utils/pipeline";
import { Broker } from "../lib/broker";

interface Message {
  payload: unknown;
  to: string;
}

export const message =
  (io: Server) =>
  (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) =>
  (broker: Broker) => {
    socket.on("message", async (msg: Message) => {
      const messageDetail = {
        ...msg,
        from: socket.id,
        date: new Date().toISOString(),
      };
      console.log(msg)

      // await broker.sendMessage("message-create", [
      //   JSON.stringify(messageDetail),
      // ]);

      // socket
      //   .to(msg.to)
      //   .emit("message", { payload: msg.payload, from: socket.id });
    });
  };
