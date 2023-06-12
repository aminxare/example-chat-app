"use client";
import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "@/theme";

type ThemeModes = "dark" | "light";

const themeContext = createContext({
  changeMode: (mode: ThemeModes) => {},
});

export const useTheme = () => useContext(themeContext);

function Provider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeModes>("light");

  const theme = useMemo(() => {
    return getTheme(mode);
  }, [mode]);

  const changeMode = (mode: ThemeModes) => {
    setMode(mode);
  };

  return (
    <themeContext.Provider
      value={{
        changeMode,
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
        <CssBaseline />
      </ThemeProvider>
    </themeContext.Provider>
  );
}

export default Provider;
