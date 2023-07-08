import { Server, Socket } from "socket.io";
import { message } from "../controllers/chat";
import { createMessager } from "../lib/broker";
import { setOffline, setOnline } from "../lib/redis";
import { topics } from "../lib/broker/topics";

const handleTokenValidationRes = (message: string, socket: Socket) => {
  const { id, user } = JSON.parse(message);

  if (user) setOnline(user.username, id);
  socket.to(id).emit("connection", user ? id : null);
};

const setListeners = (io: Server) => {
  // If the token is invalid then it should return null
  io.on("connection", async (socket) => {
    const token = socket.handshake.auth.token;
    socket.on("disconnect", () => {
      try {
        setOffline(socket.id);
      } catch (err) {
        console.log(err);
      }
    });
    if (!token) return socket.emit("connection", null);

    const broker = createMessager(["localhost:9092"], Object.values(topics), 'chat-backend');

    const payload = JSON.stringify({ token, id: socket.id });

    // check is user logged in
    broker.send("validate-token", payload);
    broker.receive(({ message, topic }) => {
      const messageString = message.value?.toString()
      if (!messageString) return;

      switch (topic) {
        case topics.TOKEN_VALIDATION:
          handleTokenValidationRes(messageString, socket);
          break;
      }
    });

    message(io)(socket)(broker);
  });

  return io;
};

export default setListeners;
