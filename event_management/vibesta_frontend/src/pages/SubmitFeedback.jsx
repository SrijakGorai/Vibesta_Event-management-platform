import React, { useState } from "react";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import axios from "../services/api";

const SubmitFeedback = () => {
  const theme = useTheme(); // Get current theme
  const [question, setQuestion] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      await axios.post("/api/feedback/submit", { email, question });
      setSuccess("Feedback submitted successfully!");
      setQuestion("");
    } catch (err) {
      console.error(err);
      setSuccess("Failed to submit feedback.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        p: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0,0.7)"
              : "rgba(255,255,255,0.9)",
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Submit Feedback / Question
        </Typography>
        <TextField
          label="Your Question / Feedback"
          multiline
          rows={4}
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Submit
        </Button>
        {success && <Typography sx={{ mt: 2 }}>{success}</Typography>}
      </Box>
    </Box>
  );
};

export default SubmitFeedback;
