import dotenv from "dotenv";
import configDatabase from "./database";
import { createHttpServer } from "./init/httpServer";
import { runBroker } from "./init/broker";
import { createWSServer } from "./init/WSServer";

const configServer = () => {
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
  await configDatabase();

  await runBroker();
  configServer();
};

run();
