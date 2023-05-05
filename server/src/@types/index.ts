import type { RequestHandler } from "express";
import { Response } from "../helpers/response";

export type Handler<T> = RequestHandler<{}, Response, T>;
