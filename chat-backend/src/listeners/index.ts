import { Server } from "socket.io";
import { message } from "../controllers/chat";

const setListeners = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(socket.handshake.auth)
    socket.emit("connection", socket.id);

    message(io)(socket);
  });

  return io;
};

export default setListeners;
