"use client";
import agent from "@/api/agent";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useLocalStorage("token", null);

  const handelUsername: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handelPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handelSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      const res = await agent.auth.login(username, password);
      setToken(res.data.token);
    } catch (error: any) {
      console.log(error.response.data.message);
      console.log(error.response.status);
    }
  };

  return (
    <form onSubmit={handelSubmit}>
      <label htmlFor="txtUsername">Username: </label>
      <input
        id="txtUsername"
        type="text"
        placeholder="Username"
        onChange={handelUsername}
      />
      <label htmlFor="txtPassword">Password: </label>
      <input
        id="txtPassword"
        type="text"
        placeholder="Password"
        onChange={handelPassword}
      />
      <button>Login</button>
    </form>
  );
};

export default Page;
