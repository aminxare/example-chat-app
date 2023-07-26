import { LoginResponse } from "./@types";
import { User, Room } from "@/@types";
import requests from "./requests";

const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

const header = ({
  token,
  signal,
}: {
  token?: string;
  signal?: AbortSignal;
}) => {
  const auth = token ? authHeader(token) : null;
  return {
    ...auth,
    signal,
  };
};

const auth = {
  login: (username: string, password: string) =>
    requests.post<LoginResponse>("/auth/login", {
      username,
      password,
    }),

  fetchUser: (token: string) =>
    requests.post<User>("/auth/verify-token", { token }),
};

const room = {
  create: (creatorId: number, name: string, token: string) =>
    requests.post<Room>("/room", { creatorId, name }, header({ token })),

  addMember: (roomId: string, username: string, token: string) =>
    requests.post<boolean>(
      `/room/${roomId}/add`,
      { username },
      header({ token })
    ),

  getAll: (token: string, signal?: AbortSignal) =>
    requests.get<{ rooms: Room[] }>("/room", header({ token, signal })),
};

const agent = {
  auth,
  room,
};

export default agent;
