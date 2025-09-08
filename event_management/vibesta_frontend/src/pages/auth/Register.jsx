import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  Paper,
} from "@mui/material";
import { registerUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 4,
          width: 350,
          borderRadius: 3,
          backdropFilter: "blur(12px)",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.6)"
              : "rgba(255,255,255,0.6)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          textAlign="center"
          color={theme.palette.mode === "dark" ? "white" : "black"}
        >
          Register
        </Typography>

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" sx={{ mt: 1 }}>
            {success}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;
