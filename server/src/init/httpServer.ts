import express from "express";
import { createServer } from "http";
import { router as authRoute } from "../features/index";
import errorHandler from "../routes/error";
import cors, { CorsOptions } from "cors";

export const createHttpServer = () => {
  const app = express();

  const corsOpt: CorsOptions = {
    origin: "http://localhost:3000",
    allowedHeaders: "*",
  };

  app.use(cors(corsOpt));
  app.use(express.json());
  app.use("/api/auth", authRoute);
  app.use(errorHandler);

  return createServer(app);
};
