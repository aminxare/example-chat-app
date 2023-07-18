"use client";
import { Avatar, Collapse, List, ListItemText } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useState } from "react";
import AddMemberDialog from "./AddMemberDialog";
import { useChat } from "@/context/Chats";

interface Props {
  primary: string;
  secondary: string;
  roomId: string;
  avatarSrc?: string;
}

function MessageListItem({ avatarSrc, primary, secondary, roomId }: Props) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { addMember } = useChat();

  const handleDialogClose = () => setOpen(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleAddMemberClick = async (username: string | null) => {
    setOpenDialog(false);
    if (!username) return;
    await addMember(roomId, username);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpen((p) => !p)}>
          <ListItemAvatar>
            <Avatar alt={primary} src={avatarSrc} />
          </ListItemAvatar>
          <ListItemText primary={primary} secondary={secondary} />
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout={"auto"} unmountOnExit>
        <List component={"div"} sx={{ pl: 4 }} disablePadding>
          <ListItemButton>Open</ListItemButton>
          {/* TODO: Add, edit, delete just is avaible for creator*/}
          <ListItemButton onClick={handleDialogOpen}>Add</ListItemButton>
          <ListItemButton>Edit</ListItemButton>
          <ListItemButton>Delete</ListItemButton>
        </List>
      </Collapse>
      <AddMemberDialog
        open={openDialog}
        onClose={handleDialogClose}
        onSubmit={handleAddMemberClick}
      />
    </>
  );
}

export default MessageListItem;
