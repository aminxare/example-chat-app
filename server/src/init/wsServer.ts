import { IncomingMessage, ServerResponse } from "http";
import { Server } from "socket.io";
import { Server as httpServer } from "http";

export const createWSServer = (
  server: httpServer<typeof IncomingMessage, typeof ServerResponse>
) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("hello", (...args) => {
      console.log("args: ", args);
    });
  });

  return io;
};