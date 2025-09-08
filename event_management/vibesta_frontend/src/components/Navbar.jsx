// src/components/Navbar.jsx
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { logout } from "../services/auth";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // 👈 mobile breakpoint
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleMenuClose();
  };

  // Define the nav items
  const navItems = token
    ? [
        role === "ADMIN" && { label: "Admin", to: "/admin" },
        { label: "Events", to: "/events" },
        role === "ADMIN" && { label: "Manage Feedback", to: "/admin/feedback" },
        role === "USER" && { label: "Submit Feedback", to: "/feedback/submit" },
        role === "USER" && { label: "My Feedback", to: "/feedback/my" },
        { label: "Logout", action: handleLogout },
      ].filter(Boolean)
    : [
        { label: "Home", to: "/" },
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: "'Great Vibes', cursive",
            fontWeight: 400,
            fontStyle: "italic",
            background:
              "linear-gradient(90deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            letterSpacing: 2,
            fontSize: { xs: "2.2rem", md: "3.5rem" },
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.1)",
              textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
            },
          }}
        >
          Vibesta
        </Typography>

        {/* Desktop view: buttons inline */}
        {!isMobile ? (
          <Box>
            {navItems.map((item, idx) =>
              item.action ? (
                <Button key={idx} color="inherit" onClick={item.action}>
                  {item.label}
                </Button>
              ) : (
                <Button
                  key={idx}
                  color="inherit"
                  component={Link}
                  to={item.to}
                  onClick={handleMenuClose}
                >
                  {item.label}
                </Button>
              )
            )}
            <ThemeToggle />
          </Box>
        ) : (
          // Mobile view: hamburger + dropdown
          <Box>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleMenuOpen}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {navItems.map((item, idx) =>
                item.action ? (
                  <MenuItem key={idx} onClick={item.action}>
                    {item.label}
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={idx}
                    component={Link}
                    to={item.to}
                    onClick={handleMenuClose}
                  >
                    {item.label}
                  </MenuItem>
                )
              )}
              <MenuItem>
                <ThemeToggle />
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
