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
import { Send } from "@mui/icons-material";
import { useChat } from "@/context/Chats";
import { useAuth } from "@/context/Auth";

function MessageBox() {
  const { getMessages, sendMessage } = useChat();
  const { getUser } = useAuth();
  const [newMessage, setNewMessage] = useState<string>("");

  const messages = getMessages();

  const appendNewMessage = (msg: string) => {
    if (msg.trim() !== "") {
      sendMessage(msg);
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
        {messages &&
          messages.map((message, index) => (
            <Box key={index}>
              <Card
                elevation={10}
                sx={{
                  width: "min-content",
                  padding: "6px",
                  backgroundColor:
                    message.creatorUsername === getUser()!.username
                      ? "teal"
                      : "",
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
