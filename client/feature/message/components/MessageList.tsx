import { Theme } from "@emotion/react";
import {
  SxProps,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Stack,
} from "@mui/material";
import MessageListItem from "./MessageListItem";

function MessageList({
  onSelect,
  sx,
}: {
  onSelect: (chatId: string) => void;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
        }}
      >
        <List sx={{ overflow: "hidden" }}>
          <MessageListItem avatarSrc="" primary="Amin" secondary="text" onSelect={()=>{}} />
        </List>
      </Box>

      <Stack marginTop={5} spacing={0.5}>
        <Button variant="outlined" color="success">
          Create
        </Button>
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </Stack>
    </Box>
  );
}

export default MessageList;
