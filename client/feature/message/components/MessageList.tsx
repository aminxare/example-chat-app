import { Theme } from "@emotion/react";
import { SxProps, Box, List, Stack, Button } from "@mui/material";
import MessageListItem from "./MessageListItem";
import { useChat } from "@/context/Chats";
import CreateRoomDialog from "./CreateRoomDialog";
import { useState } from "react";

function MessageList({
  onSelect,
  sx,
}: {
  onSelect: (chatId: string) => void;
  sx?: SxProps<Theme>;
}) {
  const { createRoom, rooms } = useChat();
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSubmitRoom = async (name: string | null) => {
    if (!name) return;
    await createRoom(name);
  };

  return (
    <Stack
      sx={{
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box
        sx={{
          border: "solid 1px rgba(6, 6, 6, 0.06)",
          borderRadius: "6px",
          ...sx,
          overflowY: "scroll",
          "::-webkit-scrollbar": {
            display: "none",
          },
          height: "100%",
        }}
      >
        <List sx={{ overflow: "hidden" }}>
          {rooms.map((r) => (
            <MessageListItem
              key={r.id}
              roomId={r.id}
              avatarSrc={r.avatar}
              primary={r.name || " "}
              secondary="text"
            />
          ))}
        </List>
      </Box>

      <CreateRoomDialog
        onSubmit={handleSubmitRoom}
        open={open}
        onClose={handleDialogClose}
      />
      <Button variant="outlined" onClick={handleDialogOpen}>
        Create Room
      </Button>
    </Stack>
  );
}

export default MessageList;
