import axios, { AxiosResponse } from "axios";
import { LoginResponse, Response } from "./@types";
import { User } from "@/@types";

axios.defaults.baseURL = "http://localhost:5000/api";
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<Response<T>>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<Response<T>>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) =>
    axios.put<Response<T>>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<Response<T>>(url).then(responseBody),
};

const auth = {
  login: (username: string, password: string) =>
    requests.post<LoginResponse>("/auth/login", {
      username,
      password,
    }),

  verifyToken: (token: string) =>
    requests.post<User>("/auth/verify-token", { token }),
};

const agent = {
  auth,
};

export default agent;
