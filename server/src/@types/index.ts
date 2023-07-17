import type { RequestHandler, ErrorRequestHandler } from "express";
import { Response } from "../helpers/response";

export type Handler<T> = RequestHandler<{}, Response, T>;
export type ErrorHandler<T> = ErrorRequestHandler<{}, Response, T>;
