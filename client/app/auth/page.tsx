"use client";
import agent from "@/api/agent";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

const Page = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    console.log("username: ", username);
    console.log("password: ", password);
    if (!username || !password) return;

    const res = await agent.auth.login(username, password).catch((error) => {
      console.log(error.response.data.message);
      console.log(error.response.status);
    });
    console.log("res: ", res);
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
