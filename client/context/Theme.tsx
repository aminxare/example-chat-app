"use client";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getTheme from "@/theme";

type ThemeModes = "dark" | "light";

const themeContext = createContext({
  mode: "light",
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

  // retrive theme-mode from localstorage
  useEffect(()=>{
    const m = localStorage.getItem('theme-mode');
    if(m === 'light' || m === 'dark') setMode(m);
  }, [])
  // save mode on localstorage
  useEffect(()=>{
    localStorage.setItem('theme-mode', mode)
  },[mode])

  return (
    <themeContext.Provider
      value={{
        mode,
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
