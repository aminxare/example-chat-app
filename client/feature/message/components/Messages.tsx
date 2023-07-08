import { Grid, Paper } from "@mui/material";
import MessageList from "./MessageList";
import MessageBox from "./MessageBox";
import { useChat } from "@/context/Chats";

export default function Chat() {
  const { messages, sendMessage } = useChat();

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
          onNewMessage={(msg) => {
            sendMessage(msg, '');
          }}
        />
      </Grid>
    </Grid>
  );
}
