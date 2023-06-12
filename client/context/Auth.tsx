"use client";
import agent from "@/api/agent";
import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useContext } from "react";

const authContext = createContext({
  isLogin: false,
  login: async (username: string, password: string) => {},
  logout: () => {},
  getUser: () => {},
});

export const useAuth = () => useContext(authContext);

function Provider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useLocalStorage("token", null);
  const isLogin = !!token;

  const login = async (username: string, password: string) => {
    if (!username) throw new Error("Please fill username!");
    if (!password) throw new Error("Please fill password!");

    const res = await agent.auth.login(username, password);
    setToken(res.data.token);
  };

  const logout = () => {
    setToken(null);
  };

  const getUser = () => {
    return {};
  };

  return (
    <authContext.Provider
      value={{
        isLogin,
        login,
        logout,
        getUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default Provider;
