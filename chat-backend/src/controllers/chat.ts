import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { init, sendMessage, createKafkaProducer } from "../lib/broker";
import pipeline from "../utils/pipeline";

interface Message {
  payload: unknown;
  to: string;
}

export const message =
  (io: Server) =>
  (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) => {
    socket.on("message", async (msg: Message) => {
      const messageDetail = {
        ...msg,
        from: socket.id,
        date: new Date().toISOString(),
      };
      const producer = pipeline([init, createKafkaProducer])();
      await sendMessage(producer, "message-create", [messageDetail]);

      socket
        .to(msg.to)
        .emit("message", { payload: msg.payload, from: socket.id });
    });
  };
