// src/theme/ThemeProvider.jsx
import { createContext, useMemo, useState, useContext } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";

const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
