"use client";
import {
  Avatar,
  Collapse,
  IconButton,
  List,
  ListItemText,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useState } from "react";
import AddMemberDialog from "./AddMemberDialog";
import { useChat } from "@/context/Chats";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

interface Props {
  primary: string;
  secondary: string;
  roomId: string;
  bgColor?: string;
  avatarSrc?: string;
}

function MessageListItem({
  avatarSrc,
  primary,
  secondary,
  roomId,
  bgColor,
}: Props) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { addMember, selectRoom } = useChat();

  const handleDialogClose = () => setOpenDialog(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleAddMemberClick = async (username: string | null) => {
    setOpenDialog(false);
    if (!username) return;
    await addMember(roomId, username);
  };

  const handleToggleCollapse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOpen((p) => !p);
  };

  const handleSelectRoom = () => {
    selectRoom(roomId);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleSelectRoom}
          sx={{ borderRadius: 1, backgroundColor: bgColor }}
        >
          <ListItemAvatar>
            <Avatar alt={primary} src={avatarSrc} />
          </ListItemAvatar>
          <ListItemText primary={primary} secondary={secondary} />
          <IconButton onClick={handleToggleCollapse} disableRipple>
            {open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          </IconButton>
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout={"auto"} unmountOnExit>
        <List component={"div"} sx={{ pl: 4 }} disablePadding>
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
