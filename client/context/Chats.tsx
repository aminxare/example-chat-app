"use client";
import { Message } from "@/feature/message/@types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSocket } from "./Socket";
import { useAuth } from "./Auth";
import { Room } from "@/@types";
import { useLayout } from "./Layout";

interface ChatContext {
  messages: Message[];
  sendMessage: (message: string, to: string) => boolean;
  createRoom: (name: string) => Promise<Room>;
  rooms: Room[];
  addMember: (roomId: string, username: string) => Promise<boolean>;
}

const chatContext = createContext<ChatContext>({
  rooms: [],
  messages: [],

  sendMessage: (message: string, to: string) => false,
  createRoom: async () => ({ id: "", title: "" }),
  addMember: async (roomId: string, username: string) => false,
});

export const useChat = () => useContext(chatContext);

function Provider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const { getId, send, addEventListener } = useSocket();
  const { getUser, getToken } = useAuth();
  const { snack } = useLayout();

  const addRoom = (room: Room) => setRooms((pRooms) => [...pRooms, room]);

  /**
   *
   * @param message message text
   * @param to the socket id of distination user
   * @returns it returns true if operation was success
   */
  const sendMessage = (message: string, to: string) => {
    setMessages((pm) => {
      const m: Message = {
        from: {
          socketId: getId() || "",
          username: getUser()!.username,
        },
        to: {
          // TODO: edit to
          socketId: to,
          username: to,
        },
        text: message,
        createDate: new Date().toISOString(),
      };
      setTimeout(() => console.log("messages: ", messages), 500);
      return [...pm, m];
    });

    return true;
  };

  const createRoom = async (name: string) => {
    return new Promise<Room>((resolve, reject) => {
      send("room:createRoom", { name }, (err, res: Room) => {
        if (err) {
          return snack({ message: err, serverity: "error" });
        }
        addRoom(res);
        resolve(res);
      });
    });
  };

  const addMember = async (roomId: string, username: string) => {
    return new Promise<boolean>((resolve, reject) => {
      send("room:addMember", { roomId, username }, (err, res) => {
        if (err) {
          snack({ message: err, serverity: "error" });
          return reject(err);
        } else {
          snack({ message: "User added", serverity: "success" });
          return resolve(res);
        }
      });
    });
  };

  useEffect(() => {
    addEventListener("room:added", (room: Room) => {
      addRoom(room);
    });
  }, [addEventListener]);

  useEffect(() => {
    if (!getToken()) {
      setMessages([]);
      setRooms([]);
    }
  }, [getToken]);

  return (
    <chatContext.Provider
      value={{
        rooms,
        messages,

        sendMessage,
        createRoom,
        addMember,
      }}
    >
      {children}
    </chatContext.Provider>
  );
}

export default Provider;
