import { Server } from "socket.io";
import { message } from "../controllers/chat";
import Broker from "../lib/broker";

const setListeners = (io: Server) => {
  // If the token is invalid then it should return null
  io.on("connection", async (socket) => {
    const token = socket.handshake.auth.token;
    if (!token) return socket.emit("connection", null);
    
    const broker = await Broker.new({
      brokers: ["localhost:9092"],
      groupID: "chat-backend",
      topics: ["message-create", "validate-token", "token-validated"],
    });

    const payload = JSON.stringify({ token, id: socket.id });
    // check is user logged in
    await broker.sendMessage("validate-token", payload);
    await broker.startRecivingMessages(
      "token-validated",
      async ({ message }) => {
        const { id, user } = JSON.parse(message.value?.toString()!);

        socket.to(id).emit("connection", { id, user });
      }
    );

    message(io)(socket)(broker);
  });

  return io;
};

export default setListeners;
