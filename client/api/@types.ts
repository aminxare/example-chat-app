import { User } from "@/@types";

export interface Response<T> {
  message?: string | null;
  data: T;
}

export interface LoginResponse {
  user: User;
  token: string;
}
