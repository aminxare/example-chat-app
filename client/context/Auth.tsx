"use client";
import { User } from "@/@types";
import agent from "@/api/agent";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContext {
  isLogin: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  getUser: () => User | null;
  getToken: () => string;
}

const authContext = createContext<AuthContext>({
  isLogin: false,
  login: async (username: string, password: string) => {},
  logout: () => {},
  getUser: () => null,
  getToken: () => "",
});

export const useAuth = () => useContext(authContext);

function Provider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useState<User | null>(null);

  const isLogin = !!token;

  const login = async (username: string, password: string) => {
    if (!username) throw new Error("Please fill username!");
    if (!password) throw new Error("Please fill password!");

    const res = await agent.auth.login(username, password);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  /**
   * if token is valid save user and return true
   * else return false
   * @param token string
   */
  const fetchUser = useCallback(async (token: string) => {
    const res = await agent.auth.fetchUser(token);
    const user = res.data;

    if (!user) {
      return false;
    }

    setUser(user);
    return true;
  }, []);

  const logout = () => {
    setToken(null);
  };

  const getUser = useCallback(() => {
    return user;
  }, [user]);

  const getToken = useCallback(() => token, [token]);

  // verify token
  useEffect(() => {
    fetchUser(token)
  }, [token, fetchUser]);

  return (
    <authContext.Provider
      value={{
        isLogin,
        login,
        logout,
        getUser,
        getToken,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default Provider;
