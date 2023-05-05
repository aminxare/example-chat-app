import dotenv from "dotenv";
import configDatabase from "./database";
import { createHttpServer } from "./init/httpServer";
import { createWSServer } from "./init/wsServer";

const configServer = () => {
  const port = Number(process.env.PORT);
  if (!port) {
    console.error("PORT has not setted!");
    process.exit(1);
  }

  const serverInstance = createHttpServer();
  const io = createWSServer(serverInstance);

  serverInstance.listen(port, () =>
    console.log(`Server is listening on port: ${port}`)
  );
};

const run = async () => {
  dotenv.config();
  await configDatabase();

  configServer();
};

run();
