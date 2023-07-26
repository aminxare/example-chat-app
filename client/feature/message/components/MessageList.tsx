import { Theme } from "@emotion/react";
import { memo, useState } from "react";
import { useChat } from "@/context/Chats";
import MessageListItem from "./MessageListItem";
import CreateRoomDialog from "./CreateRoomDialog";
import { SxProps, Box, List, Stack, Button } from "@mui/material";

function MessageList({ sx }: { sx?: SxProps<Theme> }) {
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
        open={open}
        onClose={handleDialogClose}
        onSubmit={handleSubmitRoom}
      />
      <Button variant="outlined" onClick={handleDialogOpen}>
        Create Room
      </Button>
    </Stack>
  );
}

export default memo(MessageList);
