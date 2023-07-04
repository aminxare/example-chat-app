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

    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        reject("socket timeout")
      }, 3000)
      socket.on("connection", (id: string | null) => {
        // if id is falsy, It means the token is invalid
        if (!id) return reject("token is not valid, please sign up");
        else return resolve(id);
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
