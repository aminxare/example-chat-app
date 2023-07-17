"use client";
import { io, Socket } from "socket.io-client";
import { ReactNode, createContext, useContext, useState } from "react";

const sleep = (seconds: number) =>
  new Promise((resolve, _) => setTimeout(resolve, seconds * 1000));

interface SocketContext {
  connect: (token: string) => Promise<string>;
  getId: () => string | null;
  connected: boolean;
  send: (
    event: string,
    payload: { [key: string]: any },
    cb?: (res: any) => void
  ) => void;
  receive: (event: string, cb: (...messages: any[]) => void) => void;
}

const socketContext = createContext<SocketContext>({
  async connect(token: string) {
    return "";
  },
  getId() {
    return "";
  },
  connected: false,
  send: () => {},
  receive: () => {},
});

export const useSocket = () => useContext(socketContext);

function Provider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState<boolean>(false);

  let socket: Socket;

  const getId = () => {
    if (!socket) return null;
    return socket.id;
  };

  const _init = (token: string) => {
    const url = process.env.SERVER_URI;

    if (!url) throw new Error("socket url has not setted");
    socket = io(url, {
      auth: {
        token,
      },
    });

    socket.on("disconnect", async (reason) => {
      console.log("socket disconnected: ", reason);
      setConnected(false);

      while (true) {
        await sleep(0.3);
        if (socket.connected) {
          setConnected(true);

          // TODO: call chat-backend to know the new id
          console.log(socket.id);
          return;
        }
      }
    });

    socket.on("connect_error", (err) => {
      console.log("socket connection error: ", err.message); // prints the message associated with the error
    });

    return socket;
  };

  const connect = (token: string) => {
    socket = _init(token);

    return new Promise<string>((resolve, reject) => {
      socket.on("connection", (id: string | null) => {
        // if id is falsy, It means the token is invalid
        if (!id) {
          setConnected(false);
          return reject("token is not valid, please sign up");
        } else {
          setConnected(true);
          return resolve(id);
        }
      });
    });
  };

  const send = (
    event: string,
    payload: { [key: string]: any },
    cb?: (res: any) => void
  ) => {
    if (!connected) throw new Error("socket not connected");

    if (!!cb) socket.emit(event, payload, cb);
    else socket.emit(event, payload);
  };

  const receive = (event: string, cb: (...args: any[]) => void) => {
    if (!connected) throw new Error("socket not connected");

    socket.on(event, cb);
  };

  return (
    <socketContext.Provider
      value={{ connect, getId, connected, send, receive }}
    >
      {children}
    </socketContext.Provider>
  );
}

export default Provider;
