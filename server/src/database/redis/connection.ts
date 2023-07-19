import { redis } from ".";

export const online = async (username: string, socketId: string) => {
  return await redis().hset("onlines", { [username]: socketId });
};

export const offline = async (username: string) => {
  return await redis().hdel("onlines", username);
};

export const getSocketId = async (username: string) => {
  return await redis().hget("onlines", username);
};
