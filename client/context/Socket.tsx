"use client";
import { io, Socket } from "socket.io-client";
import { ReactNode, createContext, useContext } from "react";

interface SocketContext {
  [key: string]: any;
}

const socketContext = createContext<SocketContext>({});

export const useSocket = () => useContext(socketContext);

function Provider({ children }: { children: ReactNode }) {
  let socket: Socket;

  const connect = (token: string) => {
    // const url = process.env.SERVER_URI;
    const url = 'http://localhost:5001';
    if (!url) throw new Error("socket url has not setted");
    socket = io(url, {
      auth: {
        token,
      },
    });
    // socket.connect()

    return new Promise((resolve, reject) => {
      socket.on("connection", (payload: any) => {
        // if id is falsy, It means the token is invalid
        console.log(payload)
        if (!payload.id) return reject("token is not valid, please sign up");
        else return resolve(payload.id);
      });
    });
  };

  return (
    <socketContext.Provider value={{ connect }}>
      {children}
    </socketContext.Provider>
  );
}

export default Provider;
