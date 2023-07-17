import { ErrorHandler } from "@/@types";
import { ResponseError, response } from "../helpers/response";

const errorHandler: ErrorHandler<unknown> = (
  err: ResponseError,
  req,
  res,
  next
) => {
  const { message, data } = err;
  const payload = {
    message,
    data,
  };

  res.status(err.statusCode || 500).send(response(payload));
  next();
};

export default errorHandler;
