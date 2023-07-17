import express from "express";
import { createServer } from "http";
import { authRouter, roomRouter } from "../features/index";
import errorHandler from "../routes/error";
import cors, { CorsOptions } from "cors";

export const createHttpServer = () => {
  const app = express();

  const corsOpt: CorsOptions = {
    // origin: "http://localhost:3000",
    origin: "*",
    allowedHeaders: "*",
  };

  app.use(cors(corsOpt));
  app.use(express.json());

  app.use("/api/auth", authRouter);
  app.use("/api/room", roomRouter);

  app.use(errorHandler);

  return createServer(app);
};
