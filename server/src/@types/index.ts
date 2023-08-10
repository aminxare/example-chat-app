import type { RequestHandler, ErrorRequestHandler } from "express";
import { Response } from "../helpers/response";
import { Socket } from "socket.io";

export type Handler<T> = RequestHandler<{}, Response, T>;
export type ErrorHandler<T> = ErrorRequestHandler<{}, Response, T>;

export type socketListenser = (
  socket: Socket
) => (
  payload: any,
  cb: (err: string | null, ...args: any[]) => void
) => Promise<void> | void;
