import { Handler } from "../@types";
import { ResponseError, error } from "../helpers/response";
import jwt from "../lib/jwt";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export const httpAuthMiddleware: Handler<unknown> = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    const error: Partial<ResponseError> = new Error("not authenticated");
    error.statusCode = 401;
    return next(error);
  }

  const user = jwt.verify(token);

  if (!token) {
    const error: Partial<ResponseError> = new Error("not authenticated");
    error.statusCode = 401;
    return next(error);
  }

  req["user"] = user;
  next();
};

export const WSAuthMiddleware = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    // socket.emit("connection", null);
    const err: ExtendedError = new Error("not authorized");
    err.data = { content: "Please retry later" };
    return next(err);
  }

  const user = jwt.verify(token);
  socket["user"] = user;
  next();
};
