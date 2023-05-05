import express from "express";
import { createServer } from "http";
import { router as authRoute } from "../features/index";
import errorHandler from "../routes/error";

export const createHttpServer = () => {
  const app = express();

  app.use(express.json());
  app.use("/", authRoute);
  app.use(errorHandler);

  return createServer(app);
}