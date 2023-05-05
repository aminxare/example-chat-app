import { ResponseError } from "../helpers/response";

const errorHandler = (err: ResponseError, req, res, next) => {
  const { message } = err;
  res.status(err.statusCode || 500).send({
    message,
  });
  next();
};

export default errorHandler;
