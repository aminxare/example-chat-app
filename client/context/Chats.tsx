"use client";
import { Message } from "@/feature/message/@types";
import { ReactNode, createContext, useContext, useState } from "react";
import { useSocket } from "./Socket";
import { useAuth } from "./Auth";
import agent from "@/api/agent";
import { Room } from "@/@types";

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

  const { getId } = useSocket();
  const { getUser, getToken } = useAuth();

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
    const userId = getUser()?.id;
    if (!userId) throw new Error("userId not found, login again!");
    const res = await agent.room.create(userId, name, getToken());
    const room = res.data;
    setRooms((pvRooms) => [...pvRooms, room]);

    return room;
  };

  const addMember = async (roomId: string, username: string) => {
    const res = await agent.room.addMember(roomId, username, getToken());
    return res.data;
  };

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
