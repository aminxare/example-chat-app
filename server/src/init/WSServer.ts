import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { WSAuthMiddleware } from "../middleware/auth";
import { online, offline } from "../database/redis/connection";
import { setListeners } from "../features";

const OnConnection = async (socket: Socket) => {
  online(socket["user"]["username"], socket.id);
  socket.on('disconnect', (_) =>{
    offline(socket["user"]["username"]);
  })
  socket.emit("connection", socket.id);

  setListeners(socket);
};

export const createWSServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      allowedHeaders: "*",
    },
  });

  io.use(WSAuthMiddleware);
  io.on("connection", OnConnection);

  return io;
};
