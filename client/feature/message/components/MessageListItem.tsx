import { Avatar, ListItemText } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";

interface Props {
  primary: string;
  secondary: string;
  avatarSrc: string;
  onSelect: (id: string) => void;
}

function MessageListItem({ avatarSrc, primary, secondary, onSelect }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => console.log("clicked")}>
        <ListItemAvatar>
          <Avatar alt="amin" src={avatarSrc} />
        </ListItemAvatar>
        <ListItemText primary={primary} secondary={secondary} />
      </ListItemButton>
    </ListItem>
  );
}

export default MessageListItem;
