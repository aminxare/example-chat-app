"use client";
import { ReactNode, createContext, useContext } from "react";

const chatContext = createContext({});

export const useChat = () => useContext(chatContext);

function Provider({ children }: { children: ReactNode }) {
  return <chatContext.Provider value={{}}>{children}</chatContext.Provider>;
}

export default Provider;
