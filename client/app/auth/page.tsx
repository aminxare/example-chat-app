"use client";
import agent from "@/api/agent";
import useLocalStorage from "@/hooks/useLocalStorage";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";

import { TextField, Container, Button, Stack, Paper } from "@mui/material";

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
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "90%",
      }}
    >
      <form onSubmit={handelSubmit}>
        <Paper style={{ padding: 20 }} elevation={3}>
          <Stack spacing={2}>
            <TextField
              label="username"
              type="text"
              onChange={handelUsername}
              id="txtUsername"
              variant="standard"
            />

            <TextField
              label="Password"
              type="text"
              id="txtPassword"
              onChange={handelPassword}
              variant="standard"
            />

            <Button type="submit" variant="outlined">
              Login
            </Button>
          </Stack>
        </Paper>
      </form>
    </Container>
  );
};

export default Page;
