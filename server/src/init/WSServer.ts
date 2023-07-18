import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { WSAuthMiddleware } from "../middleware/auth";
import { setOnline } from "../lib/redis";
import { createRoomListener } from "../features";

const OnConnection = async (socket: Socket) => {
  setOnline(socket["user"]["username"], socket.id);
  socket.emit("connection", socket.id);

  socket.on("createRoom", createRoomListener(socket));
};

export const createWSServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      allowedHeaders: "*"
    },
  });

  io.use(WSAuthMiddleware);
  io.on("connection", OnConnection);

  return io;
};
