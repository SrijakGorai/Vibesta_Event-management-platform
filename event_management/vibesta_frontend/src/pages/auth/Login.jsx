import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  Paper,
} from "@mui/material";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", res.data.email);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
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
          "url('https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=800&q=80')",
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
          Login
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
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
