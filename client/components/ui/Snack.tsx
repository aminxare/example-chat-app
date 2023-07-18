// TODO: use notistack
import MuiSnakbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  open: boolean;
  duartion?: number;
  severity?: AlertColor;
  onClose: () => void;
}

export default function Snackbar({
  children,
  severity = "info",
  open,
  duartion = 6000,
  onClose,
}: Props) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <MuiSnakbar
      open={open}
      autoHideDuration={duartion}
      onClose={handleClose}
      onClick={handleClose}
      action={null}
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
        elevation={10}
      >
        {children}
      </MuiAlert>
    </MuiSnakbar>
  );
}
