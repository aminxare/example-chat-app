import dotenv from "dotenv";
import configDatabase from "./database";
import { createHttpServer } from "./init/httpServer";
// import { runBroker } from "./init/broker";
import { createWSServer } from "./init/WSServer";
import connect from "./database/redis";

/**
 * Configures the server by setting the port, creating an HTTP server,
 * creating a WebSocket server, and starting the server on the specified port.
 *
 * @param {none} - No parameters are required.
 * @return {none} - No return value.
 */
export const configServer = () => {
  const port = Number(process.env.PORT);
  if (!port) {
    console.error("PORT has not setted!");
    process.exit(1);
  }

  const server = createHttpServer();
  const io = createWSServer(server);

  server.listen(port, () =>
    console.log(`Server is listening on port: ${port}`)
  );
};

const run = async () => {
  dotenv.config();
  connect({
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT!,
  });
  await configDatabase();

  // uncomment it for use kafka
  // await runBroker();
  configServer();
};

run();
