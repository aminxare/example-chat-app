"use client";
import { io, Socket } from "socket.io-client";
import { ReactNode, createContext, useContext } from "react";

interface SocketContext {
  connect: (token: string) => Promise<string>;
  getId: () => string | null;
}

const socketContext = createContext<SocketContext>({
  async connect(token: string) {
    return "";
  },
  getId() {
    return "";
  },
});

export const useSocket = () => useContext(socketContext);

function Provider({ children }: { children: ReactNode }) {
  let socket: Socket;

  const getId = () => {
    if (!socket) return null;
    return socket.id;
  };

  const connect = (token: string) => {
    // const url = process.env.SERVER_URI;
    const url = "http://localhost:5001";
    if (!url) throw new Error("socket url has not setted");
    socket = io(url, {
      auth: {
        token,
      },
    });

    return new Promise<string>((resolve, reject) => {
      // TODO: retry if timeouted
      setTimeout(() => {
        reject("socket timeout");
      }, 133000);
      socket.on("connection", (id: string | null) => {
        // if id is falsy, It means the token is invalid
        if (!id) return reject("token is not valid, please sign up");
        else return resolve(id);
      });
    });
  };

  return (
    <socketContext.Provider value={{ connect, getId }}>
      {children}
    </socketContext.Provider>
  );
}

export default Provider;
