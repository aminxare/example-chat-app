import { Server } from "socket.io";
import dotenv from "dotenv";
import setListeners from "./listeners";

const run = async () => {
  dotenv.config();
  const PORT = Number(process.env.PORT);
  if (!PORT) {
    throw new Error("PORT not been setted");
  }
  const server = new Server(PORT, {
    cors: {
      origin: '*'
    }
  });

  setListeners(server);
};

run();
