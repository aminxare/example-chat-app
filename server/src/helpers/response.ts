export interface Response {
  message?: string | null;
  data: unknown;
}

export interface ResponseError extends Error {
  data: unknown;
  statusCode: number;
}

export const response = (data: unknown, message?: string | null) => {
  const res: Response = { message, data };
  return res;
};

export const error = (
  message: string,
  statusCode: number = 500,
  data?: unknown
) => {
  const err: Partial<ResponseError> = new Error(message);
  err.data = data;
  err.statusCode = statusCode;

  return err;
};
