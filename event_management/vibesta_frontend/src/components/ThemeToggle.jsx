// src/components/ThemeToggle.jsx
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "../theme/ThemeProvider";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
};

export default ThemeToggle;
