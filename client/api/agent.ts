import { LoginResponse } from "./@types";
import { User, Room } from "@/@types";
import requests from "./requests";

const auth = {
  login: (username: string, password: string) =>
    requests.post<LoginResponse>("/auth/login", {
      username,
      password,
    }),

  verifyToken: (token: string) =>
    requests.post<User>("/auth/verify-token", { token }),
};

const room = {
  create: (creatorId: number, name: string, token: string) =>
    requests.post<Room>(
      "/room",
      { creatorId, name },
      {
        Authorization: `Bearer ${token}`,
      }
    ),
  addMember: (roomId: string, username: string, token: string) =>
    requests.post<boolean>(
      `/room/${roomId}/add`,
      { username },
      {
        Authorization: `Bearer ${token}`,
      }
    ),
};

const agent = {
  auth,
  room,
};

export default agent;
