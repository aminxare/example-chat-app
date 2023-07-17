import axios, { AxiosResponse } from "axios";
import { Response } from "./@types";

axios.defaults.baseURL = "http://localhost:5000/api";
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

async function get<T>(url: string) {
  return axios.get<Response<T>>(url).then(responseBody);
}

async function post<T>(url: string, body: {}, headers?) {
  return axios
    .post<Response<T>>(url, body, {
      headers,
    })
    .then(responseBody);
}

async function put<T>(url: string, body: {}) {
  return axios.put<Response<T>>(url, body).then(responseBody);
}

async function del<T>(url: string) {
  return axios.delete<Response<T>>(url).then(responseBody);
}

const requests = {
  get,
  post,
  put,
  del,
};

export default requests;
