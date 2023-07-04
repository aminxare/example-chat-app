import { Box, Button, Grid, Paper, Stack } from "@mui/material";
import MessageList from "./MessageList";
import { useState } from "react";
import MessageBox from "./MessageBox";
import { Message } from "../@types";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello",
      date: Date.now().toString(),
    },
    {
      text: "Hello",
      date: Date.now().toString(),
    },
  ]);

  return (
    <Grid container spacing={2} height={"90vh"}>
      <Grid
        item
        md={4}
        sx={{ display: { xs: "none", md: "block" }, height: "100%" }}
      >
        <Paper elevation={3} sx={{ height: "100%", padding: "0.3em" }}>
          <MessageList onSelect={(id) => console.log(id)} />
        </Paper>
      </Grid>
      <Grid item sm={12} md={8}>
        <MessageBox
          messages={messages}
          onNewMessage={(msg) =>
            setMessages((p) => [
              ...p,
              { text: msg, date: Date.now().toString() },
            ])
          }
        />
      </Grid>
    </Grid>
  );
}
