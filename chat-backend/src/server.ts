import { Server } from "socket.io";
import dotenv from "dotenv";
import setListeners from "./listeners";

const run = async () => {
  dotenv.config();
  const port = Number(process.env.PORT);
  if (!port) {
    throw new Error("PORT not been setted");
  }
  const server = new Server(port, {
    cors: {
      origin: "*",
    },
  });

  setListeners(server);
  console.log("chat-backend is listening on port: ", port);
};

run();
