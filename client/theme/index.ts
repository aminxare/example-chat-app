import { createTheme } from "@mui/material";
import button from "./components/button";

type ThemeModes = "dark" | "light";

const getTheme = (mode: ThemeModes) =>
  createTheme({
    palette: {
      mode,
    },
    components: {
      MuiButton: { ...button },
    },
  });

export default getTheme;
