import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateRoomDialog({ onSubmit, open, onClose }) {
  const [name, setName] = React.useState<string>("");

  const handleSubmit = () => {
    onSubmit(name || null);
    handleClose();
  };

  const handleClose = () => {
    onClose()
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>Create Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create room, please enter its name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Room Name"
            fullWidth
            variant="standard"
            onChange={handleChangeName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
  );
}
