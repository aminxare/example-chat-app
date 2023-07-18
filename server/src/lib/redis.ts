// { key = username: value = socketId}
const db: { [key: string]: string }[] = [];

export const setOnline = (username: string, socketId: string) =>
  db.push({ [username]: socketId });

export const setOffline = (socketId: string) => {
  // const idx = db.findIndex((client) => client[Object.keys(client)[0]] === socketId);
  // const removedClient = db.splice(idx, 1)[0];
  // if (!removedClient) return "";
  // const removedKey = Object.keys(removedClient)[0];
  
  // return removedClient[removedKey];
};
