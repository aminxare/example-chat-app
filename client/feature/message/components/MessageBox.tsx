import Paper from "@mui/material/Paper";
import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import type { Message } from "../@types";
import {
  Box,
  Card,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Padding, Send } from "@mui/icons-material";

interface Props {
  onNewMessage: (msg: string) => void;
  messages: Message[];
}

function MessageBox({ messages, onNewMessage }: Props) {
  const [newMessage, setNewMessage] = useState<string>("");

  const appendNewMessage = (msg: string) => {
    if (msg.trim() !== "") {
      onNewMessage(msg);
      setNewMessage("");
    }
  };

  const handleMessageSend = () => {
    appendNewMessage(newMessage);
  };

  const handelInputChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setNewMessage(e.target.value);

  const handelKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") appendNewMessage(newMessage);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        padding: "0.6em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={1}>
        {messages.map((message, index) => (
          <Box key={index}>
            <Card
              elevation={10}
              sx={{
                width: "min-content",
                padding: "6px",
                //  marginLeft: "auto"
              }}
            >
              <Typography>{message.text}</Typography>
            </Card>
          </Box>
        ))}
      </Stack>
      <Box display="flex">
        <TextField
          type="text"
          value={newMessage}
          onChange={handelInputChange}
          onKeyUp={handelKeyUp}
          variant="outlined"
          fullWidth
        />
        <IconButton onClick={handleMessageSend} color="primary">
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default MessageBox;
