"use client";
import { io, Socket } from "socket.io-client";
import { ReactNode, createContext, useContext } from "react";

const socketContext = createContext({
  connect(token: string) {},
});

export const useSocket = () => useContext(socketContext);

function Provider({ children }: { children: ReactNode }) {
  let socket: Socket;

  const connect = (token: string) => {
    const url = process.env.SERVER_URI;
    if (!url) throw new Error("socket url has not setted");
    socket = io(url, {
      auth:{
        token,
      },
    });

    socket.on('connection', (...args)=>console.log("connection", args))

    return socket;
  };

  return (
    <socketContext.Provider value={{ connect }}>
      {children}
    </socketContext.Provider>
  );
}

export default Provider;
