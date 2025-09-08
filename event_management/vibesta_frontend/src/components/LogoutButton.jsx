// src/components/LogoutButton.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // Call centralized logout logic
    navigate("/login"); // Redirect to login
  };

  return (
    <Button onClick={handleLogout} color="secondary" variant="contained">
      Logout
    </Button>
  );
};

export default LogoutButton;
