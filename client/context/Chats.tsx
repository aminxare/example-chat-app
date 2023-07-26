"use client";
import { Message, MessageGroup } from "@/feature/message/@types";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSocket } from "./Socket";
import { useAuth } from "./Auth";
import { Room } from "@/@types";
import { useLayout } from "./Layout";
import agent from "@/api/agent";

interface ChatContext {
  rooms: Room[];
  selectedRoomId: string | null;
  messageGroup: MessageGroup;

  getMessages: () => Message[] | null;
  selectRoom: (roomId: string) => void;
  createRoom: (name: string) => Promise<Room>;
  sendMessage: (message: string) => void;
  addMember: (roomId: string, username: string) => Promise<boolean>;
}

const chatContext = createContext<ChatContext>({
  rooms: [],
  selectedRoomId: null,
  messageGroup: {},

  getMessages: () => null,
  sendMessage: (message: string) => false,
  createRoom: async () => ({ id: "", title: "" }),
  addMember: async (roomId: string, username: string) => false,
  selectRoom: (roomId: string) => {},
});

export const useChat = () => useContext(chatContext);

function Provider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const messageGroup: MessageGroup = useMemo(
    () =>
      messages.reduce((groupMessages, message) => {
        const temp = groupMessages[message.roomId];
        const msgArr = temp ? [...temp, message] : [message];
        groupMessages[message.roomId] = msgArr;
        return { ...groupMessages };
      }, {}),

    [messages]
  );

  /**
   * if no room selected it return null;
   */
  const getMessages = useCallback(() => {
    if (!selectedRoomId) return null;
    return messageGroup[selectedRoomId];
  }, [messageGroup, selectedRoomId]);

  const { send, addEventListener } = useSocket();
  const { getToken, getUser } = useAuth();
  const { snack } = useLayout();

  const addRoom = (room: Room | Room[]) =>
    setRooms((pRooms) => {
      if (Array.isArray(room)) return [...pRooms, ...room];
      return [...pRooms, room];
    });

  /**
   *
   * @param message message text
   * @param to roomId
   * @returns it returns true if operation was success
   */
  const sendMessage = (message: string) => {
    const creatorUsername = getUser()?.username;
    if (!creatorUsername)
      return snack({ message: "no user found, login again!" });
    if (!selectedRoomId) return snack({ message: "no room selected!" });

    const newMessage: Message = {
      roomId: selectedRoomId,
      text: message,
      creatorUsername,
      createDate: new Date().toISOString(),
    };
    setMessages((pm) => [...pm, newMessage]);

    send("message:send", newMessage, (err, message) => {
      console.log("message: ", message);
      if (err) {
      }
    });
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

  const selectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  useEffect(() => {
    addEventListener("room:added", (room: Room) => {
      addRoom(room);
    });

    addEventListener("message:receive", (message) => {
      setMessages((p) => [...p, message]);
    });
  }, [addEventListener]);

  // reset all state if logout
  useEffect(() => {
    if (!getToken()) {
      setMessages([]);
      setRooms([]);
    }
  }, [getToken]);

  // fetch rooms and messages
  useEffect(() => {
    const controller = new AbortController();

    (async function () {
      const token = getToken();
      if (token) {
        const rooms = await agent.room.getAll(token, controller.signal);
        setRooms(rooms.data.rooms);
      }
    })();

    return () => controller.abort();
  }, [getToken]);

  return (
    <chatContext.Provider
      value={{
        rooms,
        selectedRoomId,
        messageGroup,

        getMessages,
        sendMessage,
        createRoom,
        addMember,
        selectRoom,
      }}
    >
      {children}
    </chatContext.Provider>
  );
}

export default Provider;
