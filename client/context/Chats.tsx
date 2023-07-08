"use client";
import { Message } from "@/feature/message/@types";
import { ReactNode, createContext, useContext, useState } from "react";
import { useSocket } from "./Socket";
import { useAuth } from "./Auth";

interface ChatContext {
  messages: Message[];
  sendMessage: (message: string, to: string) => boolean;
}

const chatContext = createContext<ChatContext>({
  messages: [],
  sendMessage: (message: string, to: string) => false,
});

export const useChat = () => useContext(chatContext);

function Provider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const { getId } = useSocket();
  const { getUser } = useAuth();

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
          username: getUser().username,
        },
        to: {
          // TODO: edit to
          socketId: to,
          username: to,
        },
        text: message,
        createDate: new Date().toISOString(),
      };
      setTimeout(()=> console.log("messages: ", messages), 500)
      return [...pm, m];
    });

    return true;
  };

  return (
    <chatContext.Provider
      value={{
        messages,

        sendMessage,
      }}
    >
      {children}
    </chatContext.Provider>
  );
}

export default Provider;
