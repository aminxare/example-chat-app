"use client";
import Snackbar from "@/components/ui/Snack";
import { AlertColor } from "@mui/material";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface SnackConfig {
  open: boolean;
  message: string;
  serverity?: AlertColor;
  duration?: number;
}

interface SnackArgs {
  message: string;
  serverity?: AlertColor;
  duration?: number;
}

interface LayoutContext {
  snack: (config: SnackArgs) => void;
}

const layoutContext = createContext<LayoutContext>({ snack() {} });

export const useLayout = () => useContext(layoutContext);

export default function LayoutProvider({ children }: { children: ReactNode }) {
  const [snackConfig, setSnackConfig] = useState<SnackConfig>({
    open: false,
    message: "",
    duration: 0,
  });

  const snack = useCallback(
    ({ message, serverity, duration = 6000 }: SnackArgs) => {
      setSnackConfig({
        open: true,
        message,
        serverity,
        duration,
      });
    },
    []
  );

  const handleCloseSnackbar = () => {
    setSnackConfig({
      open: false,
      message: "",
      serverity: "info",
    });
  };

  return (
    <layoutContext.Provider
      value={{
        snack,
      }}
    >
      {children}
      <Snackbar
        open={snackConfig.open}
        severity={snackConfig.serverity}
        onClose={handleCloseSnackbar}
      >
        {snackConfig.message}
      </Snackbar>
    </layoutContext.Provider>
  );
}
