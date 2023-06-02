import axios, { AxiosResponse } from "axios";
import { Response } from "./@types";

axios.defaults.baseURL = "http://localhost:5000/api";
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const auth = {
  login: (username: string, password: string) =>
    requests.post<Response<{ token: string }>>("/login", {
      username,
      password,
    }),
};

const agent = {
  auth,
};

export default agent;
