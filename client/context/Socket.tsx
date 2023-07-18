"use client";
import { io, Socket } from "socket.io-client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./Auth";
import { useLayout } from "./Layout";

const sleep = (seconds: number) =>
  new Promise((resolve, _) => setTimeout(resolve, seconds * 1000));

interface SocketContext {
  connect: (token: string) => void;
  getId: () => string | null;
  connected: boolean;
  send: (
    event: string,
    payload: { [key: string]: any },
    cb?: (err: string | null, res: any) => void
  ) => void;
  receive: (event: string, cb: (...messages: any[]) => void) => void;
}

const socketContext = createContext<SocketContext>({
  connect(token: string) {},
  getId: () => "",
  connected: false,
  send: () => {},
  receive: () => {},
});

export const useSocket = () => useContext(socketContext);

function Provider({ children }: { children: ReactNode }) {
  const { getToken } = useAuth();
  const [connected, setConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { snack } = useLayout();

  const getId = () => {
    if (!socket) return null;
    return socket.id;
  };

  const _init = useCallback((token: string) => {
    const url = process.env.SERVER_URI;

    if (!url) throw new Error("socket url has not setted");
    const s = io(url, {
      auth: {
        token,
      },
    });
    setSocket(s);
    setConnected(true);

    return s;
  }, []);

  const connect = useCallback(
    (token: string) => {
      _init(token);
    },
    [_init]
  );

  const send = (
    event: string,
    payload: { [key: string]: any },
    cb?: (err: string | null, res: any) => void
  ) => {
    if (!connected || !socket) throw new Error("socket not connected");
    if (!!cb) socket.emit(event, payload, cb);
    else socket.emit(event, payload);
  };

  const receive = (event: string, cb: (...args: any[]) => void) => {
    if (!connected || !socket) throw new Error("socket not connected");

    socket.on(event, cb);
  };

  // connecting if token is exits
  useEffect(() => {
    const token = getToken();
    if (token) connect(token);
  }, [getToken, connect]);

  // init socket after creation
  useEffect(() => {
    if (socket) {
      socket.on("connection", (id: string) => {
        setConnected(true);
        snack({ message: `Socket ID: ${id}` });
      });

      socket.on("disconnect", async (reason) => {
        snack({
          message: "socket disconnected: " + reason,
          serverity: "error",
        });
        setConnected(false);

        while (true) {
          await sleep(3);
          if (socket.connected) {
            setConnected(true);

            // TODO: call server to know the new id
            snack({ message: "Socket ID: " + socket.id });
            return;
          }
        }
      });

      socket.on("connect_error", (err) => {
        snack({
          message: "socket connection error: " + err.message,
          serverity: "error",
        });
      });
    }
  }, [snack, socket]);

  return (
    <socketContext.Provider
      value={{ connect, getId, connected, send, receive }}
    >
      {children}
    </socketContext.Provider>
  );
}

export default Provider;
